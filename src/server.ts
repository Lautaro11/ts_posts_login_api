import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import mongoose from "mongoose";
import compression from "compression";
import cors from "cors";
import userRoutes from "./routes/user";

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config() {
    this.app.set("port", process.env.MONGO_PORT || 3000);
    this.mongo();
    //Settings
    this.app.set("port", process.env.PORT || 4000);
    //Middelwares
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(cors());
  }

  async mongo() {
    const MONGO_URI =
      process.env.MONGO_URI || "mongodb://localhost/posts_login_project";
    try {
      await mongoose.connect(MONGO_URI);
      console.log("DB is connected");
    } catch (error) {
      console.log("ERROR CONNECTING TO MONGODB", error);
    }
  }

  routes() {
    this.app.use("/api/user", userRoutes);
  }

  start() {
    this.app.listen(this.app.get("port"), () => {
      console.log("Server on port", this.app.get("port"));
    });
  }
}

const server = new Server();
server.start();

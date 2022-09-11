import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import mongoose from "mongoose";
import compression from "compression";
import cors from "cors";
import indexRoutes from "./routes/index"; 
import userRoutes from "./routes/user";
import postRoutes from "./routes/post";

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config() {
    //Mongo
    this.app.set("port", process.env.MONGO_PORT || 3000);
    this.mongo();
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
      const m = await mongoose.connect(MONGO_URI);
      console.log(m);
      console.log("DB is connected");
    } catch (error) {
      console.log("ERROR CONNECTING TO MONGODB", error);
    }
  }

  routes() {
    this.app.use("/", indexRoutes);
    this.app.use("/api/user", userRoutes);
    this.app.use("/api/post", postRoutes);
  }

  start() {
    this.app.listen(process.env.PORT || 3000, () => {
      console.log("Server on port", process.env.PORT || 3000);
   });
  }
}

const server = new Server();
server.start();

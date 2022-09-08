import express from "express";
import controller from "../controllers/user";
import auth from "../middlewares/authorizer";
import { check } from "express-validator";

const router = express.Router();
router.post(
  "/register",
  [
    check("username").isLength({ min: 1 }),
    check("password").isLength({ min: 8 }),
  ],
  controller.register
);
router.post("/login", controller.login);
router.get("/getUser/:id", controller.getUser);
router.patch("/", auth, controller.updateUser);
router.delete("/", auth, controller.deleteUser);
router.get("/validate", auth, controller.validateToken);

export = router;
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/user";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  type token = {
    iat: number,
    id: string,
    username: string,
    exp: number
  };

  let token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const decoded_token = jwt.verify(token, process.env.JWT_SECRET?.toString() || "theSecret");
    res.locals.jwt = decoded_token;
    const user = await User.findOne({_id: res.locals.jwt.id})
    if (!user) {
      throw 'User does not exist';
    }
    next();
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export default auth;

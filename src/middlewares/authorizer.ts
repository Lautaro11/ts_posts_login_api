import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const auth = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const decoded_token = jwt.verify(token, process.env.JWT_SECRET?.toString() || "theSecret");
    res.locals.jwt = decoded_token;
    next();
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export default auth;

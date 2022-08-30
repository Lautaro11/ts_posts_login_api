import { NextFunction, Request, Response } from "express";
import bcryptjs from "bcryptjs";
import User from "../models/user";
import signJWT from "../functions/generateJWT";

const register = async (req: Request, res: Response) => {
  let { username, password } = req.body;

  try {
    const hash = await bcryptjs.hash(password, 10);
    const newUser = new User({
      username,
      password: hash,
    });
    await newUser.save();
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  let { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username});
    if (!user) {
      throw new Error();
    }
    const validate_user = await bcryptjs.compare(password, user.password);
    if (validate_user) {
      signJWT(user, (_error, token) => {
        if (_error) {
            throw new Error();
        }
        if (token) {
            return res.status(200).json({
                message: "Auth Successful",
                token,
                user: user,
              });
        }
      });
    } else {
      throw new Error();
    }
    console.log(validate_user);
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    console.log(res.locals.jwt);
    
    return res.status(200).json({
        message: `Welcome back ${res.locals.jwt.username}`,
    });
};

export default { register, login, validateToken };

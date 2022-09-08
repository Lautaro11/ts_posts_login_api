import { NextFunction, Request, Response } from "express";
import bcryptjs from "bcryptjs";
import User from "../models/user";
import Post from "../models/post";
import signJWT from "../functions/generateJWT";
import { validationResult } from "express-validator";

const register = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username });
    console.log("Login", user);
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
    console.log("Login", validate_user);
  } catch (error) {
    console.log("Login", error);
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ errors: "User id es necessary" });
  }

  try {
    const user = await User.find({ _id: id }, { _id: 0, username: 1 });
    return res.json(user);
  } catch (error) {
    return res.status(406).json({ errors: "User does not exist" });
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = res.locals.jwt.id;
  const toUpdate = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate({ _id: userId }, toUpdate, {
      new: true,
    });
    return res.json(updatedUser);
  } catch (error) {
    return res.status(406).json({ errors: "Unexpected error" });
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = res.locals.jwt.id;
  console.log("Delete UserId: ",userId);

  try {
    const deletedPosts = await Post.deleteMany({ ownerId: userId });
    const deletedUser = await User.findOneAndDelete({ _id: userId });
    console.log("Deleted Posts: ", deletedPosts);
    return res.json(`${deletedUser} was deleted successfully`);
  } catch (error) {
    return res.status(406).json({ errors: "Unexpected error" });
  }
};

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  console.log("Validate Token: ", res.locals.jwt);

  return res.status(200).json({
    message: `Welcome back ${res.locals.jwt.username}`,
  });
};

export default {
  register,
  login,
  getUser,
  updateUser,
  deleteUser,
  validateToken,
};

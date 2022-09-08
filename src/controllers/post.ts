import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import Post from "../models/post";

const fetchPosts = async (req: Request, res: Response, next: NextFunction) => {
  const { ownerId } = req.params;
  let posts;

  try {
    posts = await Post.find({ ownerId })
      .populate("ownerId", "-_id -updatedAt -password")
      .sort("createdAt");
  } catch (error) {
    return res.status(406).json({ errors: "Unexpected error" });
  }
  return res.json(posts);
};

const getPost = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ errors: "Id es necessary" });
  }

  try {
    const posts = await Post.findOne({ _id: id }).populate(
      "ownerId",
      "-_id -updatedAt -password -__v"
    );
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(406).json({ errors: "Post does not exist" });
  }
};

const createPost = async (req: Request, res: Response, next: NextFunction) => {
  const ownerId = res.locals.jwt.id;
  console.log(ownerId);
  const newPost = new Post({ ownerId });

  let title = req.body && req.body.title ? req.body.title : null;
  let image = req.body && req.body.image ? req.body.image : null;

  if (!(title && image)) {
    return res.status(400).json({ errors: "Post is empty" });
  }

  if (title) {
    newPost["title"] = title;
  }
  if (image) {
    newPost["image"] = image;
  }

  await newPost.save();
  return res.status(200).json(newPost);
};

const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!id) {
    return res.status(400).json({ errors: "Id es necessary" });
  }

  if (!title) {
    return res.status(400).json({ errors: "Title es necessary" });
  }

  try {
    const updatedPost = await Post.findOneAndUpdate({ _id: id }, title, {
      new: true,
    });
    res.json(updatedPost);
  } catch (error) {
    return res.status(406).json({ errors: "Unexpected error" });
  }
};

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ errors: "Id es necessary" });
  }

  try {
    const deletedPost = await Post.findOneAndDelete({ _id: req.params.id });
    if (!deletedPost) {
      return res.status(400).json({
        errors: [{ msg: "Post not found" }],
      });
    }
    return res.json(deletedPost);
  } catch (error) {
    return res.status(406).json({ errors: "Unexpected error" });
  }
};

export default { fetchPosts, getPost, deletePost, createPost, updatePost };

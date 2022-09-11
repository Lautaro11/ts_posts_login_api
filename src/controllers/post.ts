import { NextFunction, Request, Response } from "express";
import Post from "../models/post";

const fetchPosts = async (req: Request, res: Response, next: NextFunction) => {
  const ownerId = req.params;
  let posts;

  try {
    posts = await Post.find(ownerId, { updatedAt: 0, __v: 0 })
      .populate("ownerId", "-updatedAt -password -__v")
      .sort("createdAt");
  } catch (error) {
    return res.status(500).json({ errors: "Unexpected error" });
  }
  return res.json(posts);
};

const getPost = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ errors: "Post id es necessary" });
  }

  try {
    const posts = await Post.findOne({ _id: id }, { __v: 0 }).populate(
      "ownerId",
      "-_id -updatedAt -password -__v"
    );
    if (!posts) {
      throw Error();
    }
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(406).json({ errors: "Post does not exist" });
  }
};

const createPost = async (req: Request, res: Response, next: NextFunction) => {
  const ownerId = res.locals.jwt.id;
  const newPost = new Post({ ownerId });

  let title = req.body && req.body.title ? req.body.title : null;
  let image = req.body && req.body.image ? req.body.image : null;

  if (!(title || image)) {
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
  const { title, image } = req.body;

  if (!id) {
    return res.status(400).json({ errors: "Id es necessary" });
  }

  let toUpdate = [];

  if (!(title || image)) {
    return res.status(400).json({ errors: "At least one field is required." });
  }
  if (title && title.length > 0) {
    toUpdate.push(title);
  }
  if (image && image.length > 0) {
    toUpdate.push(image);
  }

  try {
    const updatedPost = await Post.findOneAndUpdate(
      { _id: id },
      { title, image },
      {
        new: true,
      }
    ).populate("ownerId", "-updatedAt -password -__v");
    res.json(updatedPost);
  } catch (error) {
    return res.status(500).json({ errors: "Unexpected error" });
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
    return res.status(500).json({ errors: "Unexpected error" });
  }
};

export default { fetchPosts, getPost, deletePost, createPost, updatePost };

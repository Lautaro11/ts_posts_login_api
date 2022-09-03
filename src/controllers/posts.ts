import { NextFunction, Request, Response } from "express";
import bcryptjs from "bcryptjs";
import Post from "../models/post";
import signJWT from "../functions/generateJWT";

const getPosts = async (req: Request, res: Response, next: NextFunction) => {
};

const getPost = async (req: Request, res: Response, next: NextFunction) => {
};

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
};

const createPost = async (req: Request, res: Response, next: NextFunction) => {
};

const updatePost = async (req: Request, res: Response, next: NextFunction) => {
};

export default { getPosts, getPost, deletePost, createPost, updatePost};

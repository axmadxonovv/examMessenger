import { Request, Response } from "express";
import * as postService from "../services/post.service";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";

export const createPost = async (req: AuthenticatedRequest, res: Response) => {
  const { title, content, blogId } = req.body;
  const post = await postService.createPost(
    title,
    content,
    blogId,
    req.userId!
  );
  res.status(201).json(post);
};

export const getAllPosts = async (req: Request, res: Response) => {
  const posts = await postService.getAllPostsByBlog(
    parseInt(req.params.blogId)
  );
  res.json(posts);
};

export const getPostById = async (req: Request, res: Response) => {
  const post = await postService.getPostById(parseInt(req.params.postId));
  res.json(post);
};

export const updatePost = async (req: AuthenticatedRequest, res: Response) => {
  const { title, content } = req.body;
  const post = await postService.updatePost(
    parseInt(req.params.postId),
    title,
    content
  );
  res.json(post);
};

export const deletePost = async (req: AuthenticatedRequest, res: Response) => {
  await postService.deletePost(parseInt(req.params.postId));
  res.status(204).send();
};

export const sortByDate = async (req: Request, res: Response) => {
  const posts = await postService.sortPostsByDate(parseInt(req.params.blogId));
  res.json(posts);
};

export const getComments = async (req: Request, res: Response) => {
  const comments = await postService.getCommentsByPostId(
    parseInt(req.params.postId)
  );
  res.json(comments);
};

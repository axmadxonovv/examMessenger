import { Request, Response } from "express";
import { createComment } from "../services/comment.service";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";

export const create = async (req: AuthenticatedRequest, res: Response) => {
  const { content, postId } = req.body;
  const comment = await createComment(content, postId, req.userId!);
  res.status(201).json(comment);
};

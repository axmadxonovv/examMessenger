import { Request, Response, NextFunction } from "express";
import { isBlogOwner } from "../services/blog.service";

interface AuthenticatedRequest extends Request {
  userId?: number;
}

export const checkBlogOwnership = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const blogId = parseInt(req.params.id);
    const userId = req.userId!;

    const isOwner = await isBlogOwner(blogId, userId);
    if (!isOwner) {
      return res.status(403).json({
        success: false,
        error: "Siz ushbu blog egasi emassiz",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

import { Request, Response } from "express";
import * as blogService from "../services/blog.service";

interface AuthenticatedRequest extends Request {
  userId?: number; 
}

interface CustomError extends Error {
  statusCode?: number;
}

export const createBlog = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name, description } = req.body;
    const userId = req.userId!;

    const blog = await blogService.createBlog(name, description, userId);
    res.status(201).json({
      success: true,
      data: blog,
    });
  } catch (error: any) {
    const err = error as CustomError; 
    res.status(err.statusCode || 400).json({
      success: false,
      error: err.message,
    });
  }
};

export const getBlogDetails = async (req: Request, res: Response) => {
  try {
    const blogId = parseInt(req.params.id);
    const blog = await blogService.getBlogById(blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        error: "Blog topilmadi",
      });
    }

    res.json({
      success: true,
      data: blog,
    });
  } catch (error: any) {
    const err = error as CustomError; 
    res.status(err.statusCode || 400).json({
      success: false,
      error: err.message,
    });
  }
};

export const getMyBlogs = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const blogs = await blogService.getUserBlogs(userId);
    res.json({
      success: true,
      data: blogs,
    });
  } catch (error: any) {
    const err = error as CustomError;
    res.status(err.statusCode || 400).json({
      success: false,
      error: err.message,
    });
  }
};

export const getJoinedBlogs = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = req.userId!;
    const blogs = await blogService.getJoinedBlogs(userId);
    res.json({
      success: true,
      data: blogs,
    });
  } catch (error: any) {
    const err = error as CustomError; 
    res.status(err.statusCode || 400).json({
      success: false,
      error: err.message,
    });
  }
};

export const updateBlog = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const blogId = parseInt(req.params.id);
    const { name, description } = req.body;
    const userId = req.userId!;

    const updatedBlog = await blogService.updateBlog(
      blogId,
      name,
      description,
      userId
    );
    res.json({
      success: true,
      data: updatedBlog,
    });
  } catch (error: any) {
    const err = error as CustomError; 
    res.status(err.statusCode || 400).json({
      success: false,
      error: err.message,
    });
  }
};

export const deleteBlog = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const blogId = parseInt(req.params.id);
    const userId = req.userId!;
 
    await blogService.deleteBlog(blogId, userId);
    res.json({
      success: true,
      message: "Blog muvaffaqiyatli oʻchirildi",
    });
  } catch (error: any) {
    const err = error as CustomError;
    res.status(err.statusCode || 400).json({
      success: false,
      error: err.message,
    });
  }
};

export const searchBlogs = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;

    if (!q || typeof q !== "string") {
      return res.status(400).json({
        success: false,
        error: "Qidiruv so'rovi yuborishingiz kerak",
      });
    }

    const blogs = await blogService.searchBlogs(q);
    res.json({
      success: true,
      data: blogs,
    });
  } catch (error: any) {
    const err = error as CustomError; 
    res.status(err.statusCode || 400).json({
      success: false,
      error: err.message,
    });
  }
};

export const joinBlog = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const blogId = parseInt(req.params.id);
    const userId = req.userId!;

    await blogService.joinBlog(blogId, userId);
    res.json({
      success: true,
      message: "Blogga muvaffaqiyatli qoʻshildingiz",
    });
  } catch (error: any) {
    const err = error as CustomError; 
    res.status(err.statusCode || 400).json({
      success: false,
      error: err.message,
    });
  }
};


export const leaveBlog = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const blogId = parseInt(req.params.id);
    const userId = req.userId!;

    await blogService.leaveBlog(blogId, userId);
    res.json({
      success: true,
      message: "Blogdan  chiqdingiz",
    });
  } catch (error: any) {
    const err = error as CustomError; 
    res.status(err.statusCode || 400).json({
      success: false,
      error: err.message,
    });
  }
};


export const getBlogMembers = async (req: Request, res: Response) => {
  try {
    const blogId = parseInt(req.params.id);
    const members = await blogService.getBlogMembers(blogId);
    res.json({
      success: true,
      data: members,
    });
  } catch (error: any) {
    const err = error as CustomError; 
    res.status(err.statusCode || 400).json({
      success: false,
      error: err.message,
    });
  }
};

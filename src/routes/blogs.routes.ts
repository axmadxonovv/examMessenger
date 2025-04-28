import express from "express";
import { authenticate } from "../middlewares/auth.middleware";
import {
  createBlog,
  getMyBlogs,
  getJoinedBlogs,
  getBlogDetails,
  updateBlog,
  deleteBlog,
  searchBlogs,
  joinBlog,
  leaveBlog,
  getBlogMembers,
} from "../controllers/blogs.controller";

const router = express.Router();

router.use(authenticate);

router.post("/", createBlog);
router.get("/my-blogs", getMyBlogs);
router.get("/joined-blogs", getJoinedBlogs);
// router.get("/:id", getBlogDetails);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

// router.get("/search", searchBlogs);

router.post("/:id/join", joinBlog);
router.post("/:id/leave", leaveBlog);
router.get("/:id/members", getBlogMembers);

export default router;

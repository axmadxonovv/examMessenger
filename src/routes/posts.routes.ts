import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import * as postController from "../controllers/posts.controller";

const router = Router();

router.use(authenticate);
router.post("/create", postController.createPost);
router.get("/:blogId/get-all", postController.getAllPosts);
router.get("/:postId/get-by-id", postController.getPostById);
router.put("/:postId/update", postController.updatePost);
router.delete("/:postId/delete", postController.deletePost);
router.get("/:blogId/sort-by-date", postController.sortByDate);
router.get("/:postId/get-comments", postController.getComments);

export default router;

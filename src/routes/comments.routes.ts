import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { create } from "../controllers/comments.controller";

const router = Router();

router.use(authenticate);
router.post("/create", create);

export default router;

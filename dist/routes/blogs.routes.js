"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const blogs_controller_1 = require("../controllers/blogs.controller");
const router = express_1.default.Router();
// Authentication required for all blog routes
router.use(auth_middleware_1.authenticate);
// Blog CRUD endpoints
router.post("/", blogs_controller_1.createBlog);
router.get("/my-blogs", blogs_controller_1.getMyBlogs);
router.get("/joined-blogs", blogs_controller_1.getJoinedBlogs);
// router.get("/:id", getBlogDetails);
router.put("/:id", blogs_controller_1.updateBlog);
router.delete("/:id", blogs_controller_1.deleteBlog);
// Blog search
// router.get("/search", searchBlogs);
// Blog membership
router.post("/:id/join", blogs_controller_1.joinBlog);
router.post("/:id/leave", blogs_controller_1.leaveBlog);
router.get("/:id/members", blogs_controller_1.getBlogMembers);
exports.default = router;

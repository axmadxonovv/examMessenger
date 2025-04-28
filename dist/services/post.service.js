"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommentsByPostId = exports.sortPostsByDate = exports.deletePost = exports.updatePost = exports.getPostById = exports.getAllPostsByBlog = exports.createPost = void 0;
const db_1 = __importDefault(require("../config/db"));
const createPost = (title, content, blogId, authorId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query(`INSERT INTO posts (title, content, blog_id, author_id) VALUES ($1, $2, $3, $4) RETURNING *`, [title, content, blogId, authorId]);
    return result.rows[0];
});
exports.createPost = createPost;
const getAllPostsByBlog = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query(`SELECT posts.*, users.username FROM posts JOIN users ON posts.author_id = users.id WHERE blog_id = $1`, [blogId]);
    return result.rows;
});
exports.getAllPostsByBlog = getAllPostsByBlog;
const getPostById = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.query(`UPDATE posts SET views = views + 1 WHERE id = $1`, [postId]);
    const result = yield db_1.default.query(`SELECT posts.*, users.username FROM posts JOIN users ON posts.author_id = users.id WHERE posts.id = $1`, [postId]);
    return result.rows[0];
});
exports.getPostById = getPostById;
const updatePost = (postId, title, content) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query(`UPDATE posts SET title = $1, content = $2, updated_at = NOW() WHERE id = $3 RETURNING *`, [title, content, postId]);
    return result.rows[0];
});
exports.updatePost = updatePost;
const deletePost = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.query(`DELETE FROM posts WHERE id = $1`, [postId]);
});
exports.deletePost = deletePost;
const sortPostsByDate = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query(`SELECT * FROM posts WHERE blog_id = $1 ORDER BY created_at DESC`, [blogId]);
    return result.rows;
});
exports.sortPostsByDate = sortPostsByDate;
const getCommentsByPostId = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query(`SELECT comments.*, users.username FROM comments JOIN users ON comments.author_id = users.id WHERE comments.post_id = $1`, [postId]);
    return result.rows;
});
exports.getCommentsByPostId = getCommentsByPostId;

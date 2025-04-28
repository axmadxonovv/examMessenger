"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComments = exports.sortByDate = exports.deletePost = exports.updatePost = exports.getPostById = exports.getAllPosts = exports.createPost = void 0;
const postService = __importStar(require("../services/post.service"));
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, blogId } = req.body;
    const post = yield postService.createPost(title, content, blogId, req.userId);
    res.status(201).json(post);
});
exports.createPost = createPost;
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield postService.getAllPostsByBlog(parseInt(req.params.blogId));
    res.json(posts);
});
exports.getAllPosts = getAllPosts;
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield postService.getPostById(parseInt(req.params.postId));
    res.json(post);
});
exports.getPostById = getPostById;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    const post = yield postService.updatePost(parseInt(req.params.postId), title, content);
    res.json(post);
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield postService.deletePost(parseInt(req.params.postId));
    res.status(204).send();
});
exports.deletePost = deletePost;
const sortByDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield postService.sortPostsByDate(parseInt(req.params.blogId));
    res.json(posts);
});
exports.sortByDate = sortByDate;
const getComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const comments = yield postService.getCommentsByPostId(parseInt(req.params.postId));
    res.json(comments);
});
exports.getComments = getComments;

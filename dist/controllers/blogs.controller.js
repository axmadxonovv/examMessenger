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
exports.getBlogMembers = exports.leaveBlog = exports.joinBlog = exports.searchBlogs = exports.deleteBlog = exports.updateBlog = exports.getJoinedBlogs = exports.getMyBlogs = exports.getBlogDetails = exports.createBlog = void 0;
const blogService = __importStar(require("../services/blog.service"));
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = req.body;
        const userId = req.userId;
        const blog = yield blogService.createBlog(name, description, userId);
        res.status(201).json({
            success: true,
            data: blog,
        });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 400).json({
            success: false,
            error: err.message,
        });
    }
});
exports.createBlog = createBlog;
const getBlogDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = parseInt(req.params.id);
        const blog = yield blogService.getBlogById(blogId);
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
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 400).json({
            success: false,
            error: err.message,
        });
    }
});
exports.getBlogDetails = getBlogDetails;
const getMyBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const blogs = yield blogService.getUserBlogs(userId);
        res.json({
            success: true,
            data: blogs,
        });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 400).json({
            success: false,
            error: err.message,
        });
    }
});
exports.getMyBlogs = getMyBlogs;
const getJoinedBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const blogs = yield blogService.getJoinedBlogs(userId);
        res.json({
            success: true,
            data: blogs,
        });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 400).json({
            success: false,
            error: err.message,
        });
    }
});
exports.getJoinedBlogs = getJoinedBlogs;
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = parseInt(req.params.id);
        const { name, description } = req.body;
        const userId = req.userId;
        const updatedBlog = yield blogService.updateBlog(blogId, name, description, userId);
        res.json({
            success: true,
            data: updatedBlog,
        });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 400).json({
            success: false,
            error: err.message,
        });
    }
});
exports.updateBlog = updateBlog;
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = parseInt(req.params.id);
        const userId = req.userId;
        yield blogService.deleteBlog(blogId, userId);
        res.json({
            success: true,
            message: "Blog muvaffaqiyatli oʻchirildi",
        });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 400).json({
            success: false,
            error: err.message,
        });
    }
});
exports.deleteBlog = deleteBlog;
const searchBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { q } = req.query;
        if (!q || typeof q !== "string") {
            return res.status(400).json({
                success: false,
                error: "Qidiruv so'rovi yuborishingiz kerak",
            });
        }
        const blogs = yield blogService.searchBlogs(q);
        res.json({
            success: true,
            data: blogs,
        });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 400).json({
            success: false,
            error: err.message,
        });
    }
});
exports.searchBlogs = searchBlogs;
const joinBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = parseInt(req.params.id);
        const userId = req.userId;
        yield blogService.joinBlog(blogId, userId);
        res.json({
            success: true,
            message: "Blogga muvaffaqiyatli qoʻshildingiz",
        });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 400).json({
            success: false,
            error: err.message,
        });
    }
});
exports.joinBlog = joinBlog;
const leaveBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = parseInt(req.params.id);
        const userId = req.userId;
        yield blogService.leaveBlog(blogId, userId);
        res.json({
            success: true,
            message: "Blogdan  chiqdingiz",
        });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 400).json({
            success: false,
            error: err.message,
        });
    }
});
exports.leaveBlog = leaveBlog;
const getBlogMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = parseInt(req.params.id);
        const members = yield blogService.getBlogMembers(blogId);
        res.json({
            success: true,
            data: members,
        });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 400).json({
            success: false,
            error: err.message,
        });
    }
});
exports.getBlogMembers = getBlogMembers;

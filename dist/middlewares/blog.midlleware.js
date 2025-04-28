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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBlogOwnership = void 0;
const blog_service_1 = require("../services/blog.service");
const checkBlogOwnership = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = parseInt(req.params.id);
        const userId = req.userId;
        const isOwner = yield (0, blog_service_1.isBlogOwner)(blogId, userId);
        if (!isOwner) {
            return res.status(403).json({
                success: false,
                error: "Siz ushbu blog egasi emassiz",
            });
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.checkBlogOwnership = checkBlogOwnership;

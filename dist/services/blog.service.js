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
exports.isBlogOwner = exports.getBlogMembers = exports.leaveBlog = exports.joinBlog = exports.searchBlogs = exports.deleteBlog = exports.updateBlog = exports.getJoinedBlogs = exports.getUserBlogs = exports.getBlogById = exports.createBlog = void 0;
const db_1 = __importDefault(require("../config/db"));
const createBlog = (name, description, ownerId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!name || name.trim().length === 0) {
        throw new Error("Blog nomi boʻsh boʻlishi mumkin emas");
    }
    const result = yield db_1.default.query(`INSERT INTO blogs (name, description, owner_id) 
     VALUES ($1, $2, $3) 
     RETURNING *`, [name.trim(), description === null || description === void 0 ? void 0 : description.trim(), ownerId]);
    return result.rows[0];
});
exports.createBlog = createBlog;
const getBlogById = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    const blogResult = yield db_1.default.query("SELECT * FROM blogs WHERE id = $1", [
        blogId,
    ]);
    if (blogResult.rowCount === 0)
        return null;
    const membersResult = yield db_1.default.query(`SELECT u.id, u.username, u.email 
     FROM users u
     JOIN blog_members bm ON u.id = bm.user_id
     WHERE bm.blog_id = $1`, [blogId]);
    const memberCountResult = yield db_1.default.query("SELECT COUNT(*) FROM blog_members WHERE blog_id = $1", [blogId]);
    return Object.assign(Object.assign({}, blogResult.rows[0]), { members: membersResult.rows, member_count: Number(memberCountResult.rows[0].count) });
});
exports.getBlogById = getBlogById;
const getUserBlogs = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query("SELECT * FROM blogs WHERE owner_id = $1 ORDER BY created_at DESC", [userId]);
    return result.rows;
});
exports.getUserBlogs = getUserBlogs;
const getJoinedBlogs = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query(`SELECT b.* FROM blogs b
     JOIN blog_members bm ON b.id = bm.blog_id
     WHERE bm.user_id = $1
     ORDER BY bm.joined_at DESC`, [userId]);
    return result.rows;
});
exports.getJoinedBlogs = getJoinedBlogs;
const updateBlog = (blogId, name, description, userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!name || name.trim().length === 0) {
        throw new Error("Blog nomi boʻsh boʻlishi mumkin emas");
    }
    const result = yield db_1.default.query(`UPDATE blogs 
     SET name = $1, description = $2, updated_at = CURRENT_TIMESTAMP 
     WHERE id = $3 AND owner_id = $4
     RETURNING *`, [name.trim(), description === null || description === void 0 ? void 0 : description.trim(), blogId, userId]);
    if (result.rowCount === 0) {
        throw new Error("Blog topilmadi yoki siz uning egasi emassiz");
    }
    return result.rows[0];
});
exports.updateBlog = updateBlog;
const deleteBlog = (blogId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query("DELETE FROM blogs WHERE id = $1 AND owner_id = $2", [blogId, userId]);
    if (result.rowCount === 0) {
        throw new Error("Blog topilmadi yoki siz uning egasi emassiz");
    }
});
exports.deleteBlog = deleteBlog;
const searchBlogs = (query) => __awaiter(void 0, void 0, void 0, function* () {
    if (!query || query.trim().length === 0) {
        throw new Error("Qidiruv soʻrovi boʻsh boʻlishi mumkin emas");
    }
    const result = yield db_1.default.query(`SELECT * FROM blogs 
     WHERE name ILIKE $1 OR description ILIKE $1
     ORDER BY name ASC`, [`%${query.trim()}%`]);
    return result.rows;
});
exports.searchBlogs = searchBlogs;
const joinBlog = (blogId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.query(`INSERT INTO blog_members (blog_id, user_id) 
     VALUES ($1, $2) 
     ON CONFLICT (blog_id, user_id) DO NOTHING`, [blogId, userId]);
});
exports.joinBlog = joinBlog;
const leaveBlog = (blogId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query("DELETE FROM blog_members WHERE blog_id = $1 AND user_id = $2", [blogId, userId]);
    if (result.rowCount === 0) {
        throw new Error("Siz ushbu blogga aʼzo emassiz");
    }
});
exports.leaveBlog = leaveBlog;
const getBlogMembers = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query(`SELECT u.id, u.username, u.email 
     FROM users u
     JOIN blog_members bm ON u.id = bm.user_id
     WHERE bm.blog_id = $1
     ORDER BY bm.joined_at DESC`, [blogId]);
    return result.rows;
});
exports.getBlogMembers = getBlogMembers;
const isBlogOwner = (blogId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query("SELECT 1 FROM blogs WHERE id = $1 AND owner_id = $2", [blogId, userId]);
    // result.rowCount mavjudligini tekshirib, keyin solishtirishni amalga oshiramiz
    if (result.rowCount !== undefined && result.rowCount !== null) {
        return result.rowCount > 0;
    }
    else {
        throw new Error("So'rov natijasi mavjud emas");
    }
});
exports.isBlogOwner = isBlogOwner;

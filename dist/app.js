"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const blogs_routes_1 = __importDefault(require("./routes/blogs.routes"));
const posts_routes_1 = __importDefault(require("./routes/posts.routes"));
const comments_routes_1 = __importDefault(require("./routes/comments.routes"));
const error_middleware_1 = require("./middlewares/error.middleware");
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api/auth", auth_routes_1.default);
app.use("/api/blogs", blogs_routes_1.default);
app.use("/api/posts", posts_routes_1.default);
app.use("/api/comments", comments_routes_1.default);
app.use(error_middleware_1.errorMiddleware);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

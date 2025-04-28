import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import blogRoutes from "./routes/blogs.routes";
import postRoutes from "./routes/posts.routes";
import commentRoutes from "./routes/comments.routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import bodyParser from "body-parser";
dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use(errorMiddleware);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import db from "../config/db";

export const createPost = async (
  title: string,
  content: string,
  blogId: number,
  authorId: number
) => {
  const result = await db.query(
    `INSERT INTO posts (title, content, blog_id, author_id) VALUES ($1, $2, $3, $4) RETURNING *`,
    [title, content, blogId, authorId]
  );
  return result.rows[0];
};

export const getAllPostsByBlog = async (blogId: number) => {
  const result = await db.query(
    `SELECT posts.*, users.username FROM posts JOIN users ON posts.author_id = users.id WHERE blog_id = $1`,
    [blogId]
  );
  return result.rows;
};

export const getPostById = async (postId: number) => {
  await db.query(`UPDATE posts SET views = views + 1 WHERE id = $1`, [postId]);
  const result = await db.query(
    `SELECT posts.*, users.username FROM posts JOIN users ON posts.author_id = users.id WHERE posts.id = $1`,
    [postId]
  );
  return result.rows[0];
};

export const updatePost = async (
  postId: number,
  title: string,
  content: string
) => {
  const result = await db.query(
    `UPDATE posts SET title = $1, content = $2, updated_at = NOW() WHERE id = $3 RETURNING *`,
    [title, content, postId]
  );
  return result.rows[0];
};

export const deletePost = async (postId: number) => {
  await db.query(`DELETE FROM posts WHERE id = $1`, [postId]);
};

export const sortPostsByDate = async (blogId: number) => {
  const result = await db.query(
    `SELECT * FROM posts WHERE blog_id = $1 ORDER BY created_at DESC`,
    [blogId]
  );
  return result.rows;
};

export const getCommentsByPostId = async (postId: number) => {
  const result = await db.query(
    `SELECT comments.*, users.username FROM comments JOIN users ON comments.author_id = users.id WHERE comments.post_id = $1`,
    [postId]
  );
  return result.rows;
};

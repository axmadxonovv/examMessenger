import db from "../config/db";

export const createComment = async (
  content: string,
  postId: number,
  authorId: number
) => {
  const result = await db.query(
    `INSERT INTO comments (content, post_id, author_id) VALUES ($1, $2, $3) RETURNING *`,
    [content, postId, authorId]
  );
  return result.rows[0];
};

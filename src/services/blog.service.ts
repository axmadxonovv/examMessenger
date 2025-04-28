import db from "../config/db";
import { Blog, BlogWithMembers, BlogMember } from "../models/blog.model";
import { User } from "../models/user.model";

export const createBlog = async (
  name: string,
  description: string | null,
  ownerId: number
): Promise<Blog> => {
  if (!name || name.trim().length === 0) {
    throw new Error("Blog nomi boʻsh boʻlishi mumkin emas");
  }

  const result = await db.query<Blog>(
    `INSERT INTO blogs (name, description, owner_id) 
     VALUES ($1, $2, $3) 
     RETURNING *`,
    [name.trim(), description?.trim(), ownerId]
  );

  return result.rows[0];
};

export const getBlogById = async (
  blogId: number
): Promise<BlogWithMembers | null> => {
  const blogResult = await db.query<Blog>("SELECT * FROM blogs WHERE id = $1", [
    blogId,
  ]);

  if (blogResult.rowCount === 0) return null;

  const membersResult = await db.query<User>(
    `SELECT u.id, u.username, u.email 
     FROM users u
     JOIN blog_members bm ON u.id = bm.user_id
     WHERE bm.blog_id = $1`,
    [blogId]
  );

  const memberCountResult = await db.query<{ count: number }>(
    "SELECT COUNT(*) FROM blog_members WHERE blog_id = $1",
    [blogId]
  );

  return {
    ...blogResult.rows[0],
    members: membersResult.rows,
    member_count: Number(memberCountResult.rows[0].count),
  };
};

export const getUserBlogs = async (userId: number): Promise<Blog[]> => {
  const result = await db.query<Blog>(
    "SELECT * FROM blogs WHERE owner_id = $1 ORDER BY created_at DESC",
    [userId]
  );
  return result.rows;
};

export const getJoinedBlogs = async (userId: number): Promise<Blog[]> => {
  const result = await db.query<Blog>(
    `SELECT b.* FROM blogs b
     JOIN blog_members bm ON b.id = bm.blog_id
     WHERE bm.user_id = $1
     ORDER BY bm.joined_at DESC`,
    [userId]
  );
  return result.rows;
};

export const updateBlog = async (
  blogId: number,
  name: string,
  description: string | null,
  userId: number
): Promise<Blog> => {
  if (!name || name.trim().length === 0) {
    throw new Error("Blog nomi boʻsh boʻlishi mumkin emas");
  }

  const result = await db.query<Blog>(
    `UPDATE blogs 
     SET name = $1, description = $2, updated_at = CURRENT_TIMESTAMP 
     WHERE id = $3 AND owner_id = $4
     RETURNING *`,
    [name.trim(), description?.trim(), blogId, userId]
  );

  if (result.rowCount === 0) {
    throw new Error("Blog topilmadi yoki siz uning egasi emassiz");
  }

  return result.rows[0];
};

export const deleteBlog = async (
  blogId: number,
  userId: number
): Promise<void> => {
  const result = await db.query(
    "DELETE FROM blogs WHERE id = $1 AND owner_id = $2",
    [blogId, userId]
  );

  if (result.rowCount === 0) {
    throw new Error("Blog topilmadi yoki siz uning egasi emassiz");
  }
};

export const searchBlogs = async (query: string): Promise<Blog[]> => {
  if (!query || query.trim().length === 0) {
    throw new Error("Qidiruv soʻrovi boʻsh boʻlishi mumkin emas");
  }

  const result = await db.query<Blog>(
    `SELECT * FROM blogs 
     WHERE name ILIKE $1 OR description ILIKE $1
     ORDER BY name ASC`,
    [`%${query.trim()}%`]
  );

  return result.rows;
};

export const joinBlog = async (
  blogId: number,
  userId: number
): Promise<void> => {
  await db.query(
    `INSERT INTO blog_members (blog_id, user_id) 
     VALUES ($1, $2) 
     ON CONFLICT (blog_id, user_id) DO NOTHING`,
    [blogId, userId]
  );
};

export const leaveBlog = async (
  blogId: number,
  userId: number
): Promise<void> => {
  const result = await db.query(
    "DELETE FROM blog_members WHERE blog_id = $1 AND user_id = $2",
    [blogId, userId]
  );

  if (result.rowCount === 0) {
    throw new Error("Siz ushbu blogga aʼzo emassiz");
  }
};

export const getBlogMembers = async (blogId: number): Promise<User[]> => {
  const result = await db.query<User>(
    `SELECT u.id, u.username, u.email 
     FROM users u
     JOIN blog_members bm ON u.id = bm.user_id
     WHERE bm.blog_id = $1
     ORDER BY bm.joined_at DESC`,
    [blogId]
  );
  return result.rows;
};

export const isBlogOwner = async (
  blogId: number,
  userId: number
): Promise<boolean> => {
  const result = await db.query(
    "SELECT 1 FROM blogs WHERE id = $1 AND owner_id = $2",
    [blogId, userId]
  );

  // result.rowCount mavjudligini tekshirib, keyin solishtirishni amalga oshiramiz
  if (result.rowCount !== undefined && result.rowCount !== null) {
    return result.rowCount > 0;
  } else {
    throw new Error("So'rov natijasi mavjud emas");
  }
};

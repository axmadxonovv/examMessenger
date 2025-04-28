import db from "../config/db";
import bcrypt from "bcryptjs";

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await db.query(
    `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, created_at, updated_at`,
    [username, email, hashedPassword]
  );
  return result.rows[0];
};

export const loginUser = async (email: string, password: string) => {
  const result = await db.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  if (result.rowCount === 0) throw new Error("User not found");

  const user = result.rows[0];
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  delete user.password;
  return user;
};

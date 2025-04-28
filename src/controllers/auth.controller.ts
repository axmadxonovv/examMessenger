import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const user = await registerUser(username, email, password);
  res.status(201).json(user);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await loginUser(email, password);
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
  res.cookie("token", token, { httpOnly: true });
  res.json({ message: "Login successful", user });
};

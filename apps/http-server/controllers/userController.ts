import type { Request, Response } from "express";
import prisma from "../db/primsa";
import bcrypt from "bcrypt";
import { Jwt } from "jsonwebtoken";
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
};

const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  const existingUser = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  if (existingUser) {
    res.status(401).json({ sucess: false, message: "user already exists" });
  }

  const hashPassword = bcrypt.hash(password, 10) as unknown as string;
  const user = await prisma.user.create({
    data: {
      email: email,
      name: name,
      password: hashPassword,
    },
  });

  if (!user) {
    res.status(400).json({ success: false, message: "user creation failed" });
  }

  return res.status(200).json({
    message: "user created successfully!!",
    user: user,
    success: true,
  });
};

export { login, register };

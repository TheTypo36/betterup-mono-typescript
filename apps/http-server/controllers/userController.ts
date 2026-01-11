import type { Request, Response } from "express";
import prisma from "@repo/db";
import bcrypt from "bcrypt";
// import { Jwt } from "jsonwebtoken";
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!existingUser) {
    res.json({ message: "user already exists", success: false, data: null });
  }
};
const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      res.status(401).json({ sucess: false, message: "user already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
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
  } catch (error) {
    console.error(error);
    res.json({
      message: "failed in registering user",
      data: null,
      success: false,
    });
  }
};

export { login, register };

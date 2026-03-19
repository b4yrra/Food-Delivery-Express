import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../../../lib/prisma";
import jwt from "jsonwebtoken";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    res.status(400).json({ message: "User not found" });
    return;
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (validPassword) {
    const accessToken = jwt.sign(
      {
        data: {
          userId: user.id,
          email: user.email,
          role: "User",
        },
      },
      "secret",
      { expiresIn: "1h" },
    );

    res.status(200).json({ accessToken });
  } else {
    res.status(400).json({ message: "Invalid" });
  }
};

import { prisma } from "../../lib/prisma";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

export const addUser = async (req: Request, res: Response) => {
  const { email, password, address, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        address,
        role,
      },
    });

    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid" });
  }
};

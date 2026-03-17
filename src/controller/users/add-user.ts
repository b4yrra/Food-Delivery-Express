import { prisma } from "../../lib/prisma";
import { Request, Response } from "express";

export const addUser = async (req: Request, res: Response) => {
  const { email, password, age, phoneNumber, address, role } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        email,
      },
    });

    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid" });
  }
};

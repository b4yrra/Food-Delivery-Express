// src/controller/users/add-user.ts
import { prisma } from "../../lib/prisma";
import { Request, Response } from "express";

export const addUser = async (req: Request, res: Response) => {
  const { email, password, address, age, phoneNumber } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password,
        address,
        age,
        phoneNumber,
      },
    });

    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid" });
  }
};

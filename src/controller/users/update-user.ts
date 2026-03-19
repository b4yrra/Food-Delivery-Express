import { prisma } from "../../lib/prisma";
import { Request, Response } from "express";

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, password, address, role } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        email,
        password,
        address,
        role,
      },
    });

    res.json({ updatedUser });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err });
  }
};

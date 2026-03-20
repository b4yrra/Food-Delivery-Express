import { prisma } from "../../lib/prisma";
import { Request, Response } from "express";

export const getUserById = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: Number(req.params.id) },
  });
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
};

import { prisma } from "../../lib/prisma";
import { Request, Response } from "express";

export const me = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user?.userId ? Number(req.user.userId) : undefined,
    },
    select: {
      email: true,
      password: true,
    },
  });

  if (!user) return res.status(400).json({ message: "User Not Found" });

  return res.status(200).json(user);
};

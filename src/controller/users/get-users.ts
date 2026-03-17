import { prisma } from "../../lib/prisma";
import { Request, Response } from "express";

export const getUsers = async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

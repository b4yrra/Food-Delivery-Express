import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const getFoods = async (_req: Request, res: Response) => {
  const foods = await prisma.food.findMany({
    include: { category: true },
  });
  res.json({ foods });
};

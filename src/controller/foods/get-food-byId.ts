import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const getFoodById = async (req: Request, res: Response) => {
  const food = await prisma.food.findUnique({
    where: { id: Number(req.params.id) },
    include: { category: true },
  });
  if (!food) return res.status(404).json({ error: "Food not found" });
  res.json({ food });
};

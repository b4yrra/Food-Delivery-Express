import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const getCategoryById = async (req: Request, res: Response) => {
  const category = await prisma.foodCategory.findUnique({
    where: { id: Number(req.params.id) },
    include: { foods: true },
  });
  if (!category) return res.status(404).json({ error: "Category not found" });
  res.json({ category });
};

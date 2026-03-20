import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const updateCategory = async (req: Request, res: Response) => {
  const { categoryName } = req.body;

  try {
    const category = await prisma.foodCategory.update({
      where: { id: Number(req.params.id) },
      data: { categoryName },
    });
    res.json({ category });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Category not found" });
  }
};

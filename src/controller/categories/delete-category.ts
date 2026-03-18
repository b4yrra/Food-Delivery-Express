import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    await prisma.foodCategory.delete({
      where: { id: Number(req.params.id) },
    });
    res.status(204).send();
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Category not found" });
  }
};

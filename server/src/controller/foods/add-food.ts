import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const addFood = async (req: Request, res: Response) => {
  const { name, price, img, ingredients, foodCategoryId } = req.body;

  // Check category exists first
  const category = await prisma.foodCategory.findUnique({
    where: { id: foodCategoryId },
  });

  if (!category) {
    return res.status(400).json({ message: "Category not found" });
  }

  try {
    const food = await prisma.food.create({
      data: { name, price, img, ingredients, foodCategoryId },
    });
    res.json({ food });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Invalid" });
  }
};

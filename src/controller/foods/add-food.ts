import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const addFood = async (req: Request, res: Response) => {
  const { name, price, img, ingredients, foodCategoryId } = req.body;

  try {
    const food = await prisma.food.create({
      data: {
        name,
        price,
        img,
        ingredients,
        foodCategoryId,
      },
    });
    res.json({ food });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Invalid" });
  }
};

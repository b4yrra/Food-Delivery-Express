import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const deleteFood = async (req: Request, res: Response) => {
  try {
    await prisma.food.delete({
      where: { id: Number(req.params.id) },
    });
    res.status(204).send();
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Food not found" });
  }
};

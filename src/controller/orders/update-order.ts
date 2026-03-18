import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const updateOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const food = prisma.foodOrder.update({
      where: {
        id: Number(id),
      },
      data: {
        status,
      },
    });

    res.json({ food });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "invalid" });
  }
};

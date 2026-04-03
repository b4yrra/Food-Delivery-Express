import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const getOrder = async (req: Request, res: Response) => {
  const order = await prisma.foodOrder.findMany({
    include: {
      user: true,
      foodOrderItems: {
        include: {
          food: true,
        },
      },
    },
  });
  res.json({ order });
};

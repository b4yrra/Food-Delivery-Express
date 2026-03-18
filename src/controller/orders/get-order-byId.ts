import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const getOrderById = async (req: Request, res: Response) => {
  const order = await prisma.foodOrder.findUnique({
    where: { id: Number(req.params.id) },
    include: {
      foodOrderItems: {
        include: {
          food: true,
        },
      },
      user: true,
    },
  });

  if (!order) return res.status(404).json({ error: "Order not found" });

  res.json({ order });
};

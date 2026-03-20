import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    await prisma.foodOrderItem.deleteMany({
      where: { foodOrderId: Number(req.params.id) },
    });

    await prisma.foodOrder.delete({
      where: { id: Number(req.params.id) },
    });

    res.status(204).send();
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Order not found" });
  }
};

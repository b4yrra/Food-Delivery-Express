import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const updateOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  let { status } = req.body;

  // Frontend sends "Cancelled" but DB enum is "Canceled"
  if (status === "Cancelled") status = "Canceled";

  try {
    const order = await prisma.foodOrder.update({
      where: { id: Number(id) },
      data: { status },
    });
    res.json({ order });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "invalid" });
  }
};

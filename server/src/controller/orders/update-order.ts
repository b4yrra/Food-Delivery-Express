import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const updateOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  let { status } = req.body;

  // Normalize any spelling variant to match Prisma enum exactly
  if (status === "Canceled") status = "Cancelled";

  const validStatuses = ["Pending", "Cancelled", "Delivered"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: `Invalid status: ${status}` });
  }

  try {
    const order = await prisma.foodOrder.update({
      where: { id: Number(id) },
      data: { status },
    });
    res.json({ order });
  } catch (err) {
    console.error("updateOrder error:", err);
    res.status(400).json({ message: "Order not found or invalid status" });
  }
};

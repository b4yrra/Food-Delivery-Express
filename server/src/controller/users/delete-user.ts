import { prisma } from "../../lib/prisma";
import { Request, Response } from "express";

export const deleteUser = async (req: Request, res: Response) => {
  await prisma.user.delete({ where: { id: Number(req.params.id) } });
  res.status(204).send();
};

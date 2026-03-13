import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

// GET all users
router.get("/", async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// GET user by ID
router.get("/:id", async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: Number(req.params.id) },
  });
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

// POST create user
router.post("/", async (req: Request, res: Response) => {
  const { email, name } = req.body;
  const user = await prisma.user.create({
    data: { email, name },
  });
  res.status(201).json(user);
});

// DELETE user
router.delete("/:id", async (req: Request, res: Response) => {
  await prisma.user.delete({ where: { id: Number(req.params.id) } });
  res.status(204).send();
});

export default router;

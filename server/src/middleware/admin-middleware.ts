import { Request, Response, NextFunction } from "express";

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.user;

  if (user?.role === "Admin") {
    next();
  } else {
    return res.status(400).json({ message: "Admin" });
  }
};

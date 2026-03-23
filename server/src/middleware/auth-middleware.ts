import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorization = req.headers.authorization;
  if (!authorization) return res.send("No Token");

  const accessToken = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(accessToken, "secret") as JwtPayload;

    req.user = decoded.data;
    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Invalid" });
  }
};

import express, { Request, Response } from "express";
import { prisma } from "./lib/prisma";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.get("/users");

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

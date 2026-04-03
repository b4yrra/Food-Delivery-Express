import express from "express";
import userRouter from "./routes/users";
import orderRouter from "./routes/orders";
import foodRouter from "./routes/foods";
import categoryRouter from "./routes/categories";
import authRouter from "./routes/auth";
import middleWareRouter from "./routes/middleware";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello from Express on Vercel!");
});

app.use("/users", userRouter);
app.use("/orders", orderRouter);
app.use("/foods", foodRouter);
app.use("/categories", categoryRouter);
app.use("/auth", authRouter);
app.use("/middleware", middleWareRouter);

app.listen(3000, () => console.log("Server running on 3000"));

module.exports = app;

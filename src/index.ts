import express from "express";
import userRouter from "./routes/users";
import orderRouter from "./routes/orders";
import foodRouter from "./routes/foods";
import categoryRouter from "./routes/categories";

const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/orders", orderRouter);
app.use("/foods", foodRouter);
app.use("/categories", categoryRouter);

app.listen(3000, () => console.log("Server running on 3000"));

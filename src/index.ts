import express from "express";
import userRouter from "./routes/users";
import orderRouter from "./routes/orders";

const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/orders", orderRouter);

app.listen(3000, () => console.log("Server running on 3000"));

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

// Allow requests from Next.js dev server (port 3001) and any localhost origin
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (server-to-server) or localhost origins
      if (!origin || origin.startsWith("http://localhost")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("Hello from Express on Vercel!");
});

app.use("/users", userRouter);
app.use("/orders", orderRouter);
app.use("/foods", foodRouter);
app.use("/categories", categoryRouter);
app.use("/auth", authRouter);
app.use("/middleware", middleWareRouter);

app.listen(3000, () => console.log("Server running on port 3000"));

module.exports = app;

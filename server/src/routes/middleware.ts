import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { addOrder } from "../controller/orders/add-order";
import { adminMiddleware } from "../middleware/admin-middleware";
import { getOrder } from "../controller/orders/get-order";

const router = express.Router();

router.post("/", authMiddleware, addOrder);
router.get("/", authMiddleware, adminMiddleware, getOrder);

export default router;

import { Router } from "express";
import { addOrder } from "../controller/orders/add-order";
import { getOrder } from "../controller/orders/get-order";
import { getOrderById } from "../controller/orders/get-order-byId";
import { deleteOrder } from "../controller/orders/delete-order";

const router = Router();

router.get("/", getOrder);
router.get("/:id", getOrderById);
router.post("/", addOrder);
router.delete("/:id", deleteOrder);

export default router;

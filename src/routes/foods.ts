import { Router } from "express";
import { getFoods } from "../controller/foods/get-food";
import { getFoodById } from "../controller/foods/get-food-byId";
import { addFood } from "../controller/foods/add-food";
import { updateFood } from "../controller/foods/update-food";
import { deleteFood } from "../controller/foods/delete-food";

const router = Router();

router.get("/", getFoods);
router.get("/:id", getFoodById);
router.post("/", addFood);
router.put("/:id", updateFood);
router.delete("/:id", deleteFood);

export default router;

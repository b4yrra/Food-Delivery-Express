import { Router } from "express";
import { getCategories } from "../controller/categories/get-category";
import { addCategory } from "../controller/categories/add-category";
import { deleteCategory } from "../controller/categories/delete-category";
import { getCategoryById } from "../controller/categories/get-category-byId";
import { updateCategory } from "../controller/categories/update-category";

const router = Router();

router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.post("/", addCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;

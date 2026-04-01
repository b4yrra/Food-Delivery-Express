import { Router } from "express";
import { getUsers } from "../controller/users/get-users";
import { getUserById } from "../controller/users/get-user-byId";
import { addUser } from "../controller/users/add-user";
import { updateUser } from "../controller/users/update-user";
import { deleteUser } from "../controller/users/delete-user";
import { authMiddleware } from "../middleware/auth-middleware";
import { adminMiddleware } from "../middleware/admin-middleware";
import { me } from "../controller/users/me";

const router = Router();

router.get("/", authMiddleware, adminMiddleware, getUsers);
router.get("/:id", getUserById);
router.post("/", addUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/me", authMiddleware, me);

export default router;

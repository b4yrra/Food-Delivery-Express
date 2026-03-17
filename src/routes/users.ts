import { Router } from "express";
import { getUsers } from "../controller/users/get-users";
import { getUserById } from "../controller/users/get-user-byId";
import { addUser } from "../controller/users/add-user";
import { updateUser } from "../controller/users/update-user";
import { deleteUser } from "../controller/users/delete-user";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", addUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;

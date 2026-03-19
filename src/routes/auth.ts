import { Router } from "express";
import { loginUser } from "../controller/users/auth/login";

const router = Router();

router.post("/login", loginUser);

export default router;

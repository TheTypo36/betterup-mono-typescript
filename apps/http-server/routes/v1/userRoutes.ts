import { Router } from "express";
import { login, register } from "../../controllers/userController";
const router = Router();

router.get("/login", login);
router.post("/register", register);

export default router;

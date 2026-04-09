import { Router } from "express";
import UserController from "../controllers/user.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.get("/me", auth, UserController.me);

export default router;

import { Router } from "express";
import { registerUser, loginUser, googleAuth , githubAuth } from "../controllers/authController";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/google", googleAuth);
router.post("/github", githubAuth); 

export default router;
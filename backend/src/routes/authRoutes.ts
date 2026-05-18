import { Router } from "express";
import {
  registerUser,
  loginUser,
  googleAuth,
  githubAuth,
} from "../controllers/authController";
import { updateUserProfile } from "../controllers/authController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/profile", protect, updateUserProfile);

router.post("/google", googleAuth);
router.post("/github", githubAuth);

export default router;

import express from "express";
import { login, register } from "../controllers/authControllers.js";
import { getProfile,updateProfile,} from "../controllers/profileController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";
const router = express.Router();

router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, upload.single("profileImage"), updateProfile);
router.post("/register", register);
router.post("/login",login)

export default router;
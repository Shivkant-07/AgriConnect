import express from "express";
import { addCrop, getMyCrops,updateCrop,deleteCrop, getAllCrops } from "../controllers/cropController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";
const router = express.Router();

router.post("/add", authMiddleware,upload.single("image"), addCrop);
router.get("/my-crops", authMiddleware, getMyCrops);
router.put("/:id",authMiddleware,updateCrop)
router.delete("/:id", authMiddleware, deleteCrop);
router.get("/all", getAllCrops);
export default router;
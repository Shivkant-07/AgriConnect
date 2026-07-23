import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getFarmerRequests, sendRequest, updateRequestStatus } from "../controllers/requestController.js";

const router = express.Router();

router.post("/send", authMiddleware, sendRequest);
router.get("/farmer", authMiddleware, getFarmerRequests);
router.put("/:id", authMiddleware, updateRequestStatus);
export default router;
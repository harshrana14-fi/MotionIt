//backend/src/routes/video.routes.js
import express from "express";
import { generateVideoController } from "../controllers/video.controller.js";

const router = express.Router();

router.post("/generate-video", generateVideoController);

export default router;

import express from "express";
import { generateSpeechController } from "../controllers/tts.controller.js";

const router = express.Router();

router.post("/", generateSpeechController);

export default router
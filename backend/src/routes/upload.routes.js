import express from "express";

import upload from "../middleware/upload.middleware.js";

import { uploadImageController } from "../controllers/upload.controller.js";

const router = express.Router();

router.post(

    "/image",

    upload.single("image"),

    uploadImageController

);

router.post(
    "/audio",
    upload.single("audio"),
    uploadImageController
);

export default router;
//backend/src/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import uploadRoutes from "./routes/upload.routes.js";
import ttsRoutes from "./routes/tts.routes.js";
import videoRoutes from "./routes/video.routes.js";
dotenv.config();

const app = express();

app.use(cors());

app.use(
    express.json({
        limit:"10mb"
    })
);


app.use("/api/upload", uploadRoutes);
app.use("/api/tts", ttsRoutes);
app.use("/api/video", videoRoutes);

app.get("/", (req, res) => {
    res.send("Backend is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
import { generateSpeech } from "../services/tts.service.js";
import { uploadFile } from "../services/storage.service.js";
import fs from "fs";

export const generateSpeechController = async (req, res) => {

    try {

        const { text } = req.body;

        if (!text) {

            return res.status(400).json({
                success: false,
                message: "Text is required"
            });

        }

        // Generate speech
        const audioPath = await generateSpeech(text);

        // Upload to Cloudinary
        const result = await uploadFile(
            audioPath,
            "tts",
            "video"
        );

        // Delete temp file
        fs.unlinkSync(audioPath);

        return res.json({

            success: true,

            audioUrl: result.secure_url,

            publicId: result.public_id

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
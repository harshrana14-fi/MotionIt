// backend/src/services/video.service.js

import axios from "axios";


export const generateVideoService = async (imageUrl, audioUrl) => {
    try {

        const fastApiUrl =
            process.env.FASTAPI_URL ||
            "http://127.0.0.1:7860/generate";


        console.log("🚀 Calling MuseTalk API");

        const response = await axios.post(
            fastApiUrl,
            {
                image_url: imageUrl,
                audio_url: audioUrl
            },
            {
                headers: {
                    "Content-Type": "application/json"
                },

                // MuseTalk can take time
                timeout: 10 * 60 * 1000
            }
        );


        console.log("✅ MuseTalk video generated");

        return response.data;


    } catch (error) {

        console.error(
            "MuseTalk Error:",
            error.response?.data || error.message
        );

        throw error;
    }
};
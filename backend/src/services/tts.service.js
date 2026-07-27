import axios from "axios";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const API = "https://api.tts.ai/v1";

export async function generateSpeech(text) {
    // 1. Submit job
    const job = await axios.post(`${API}/tts/`, {
        model: "kokoro",
        voice: "af_bella",
        text,
        format: "mp3",
    });

    const jobId = job.data.uuid;

    console.log("Job Created:", jobId);

    let audioUrl = null;

    // 2. Poll until completed
    while (true) {

        const result = await axios.get(
            `${API}/speech/results/?uuid=${jobId}`
        );

        if (result.data.status === "completed") {
            audioUrl = result.data.result_url;
            break;
        }

        if (result.data.status === "failed") {
            throw new Error("Speech generation failed");
        }

        await new Promise(resolve => setTimeout(resolve, 1500));
    }

    // 3. Download audio
    const audio = await axios.get(audioUrl, {
        responseType: "arraybuffer",
    });

    // 4. Save locally
    const fileName = `${uuidv4()}.mp3`;

    const filePath = path.join("src", "temp", fileName);

    fs.writeFileSync(filePath, audio.data);

    return filePath;
}
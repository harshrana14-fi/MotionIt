import dotenv from 'dotenv';
dotenv.config();
import { Client } from "@gradio/client";

async function generateTalkingVideo(imageUrl, audioUrl) {
  console.log("Connecting to Space...");
  const app = await Client.connect("John6666/SadTalker", {
    hf_token: process.env.HF_TOKEN
  });
  console.log("Connected. Sending job...");

  try {
    const job = app.submit("/test", {
      source_image: { url: imageUrl, meta: { _type: "gradio.FileData" } },
      driven_audio: { url: audioUrl, meta: { _type: "gradio.FileData" } },
      preprocess: "crop",
      still_mode: true,
      use_enhancer: false,
      batch_size: 1,
      size: "256",
      pose_style: 0,
      facerender: "facevid2vid",
      exp_scale: 1,
      use_ref_video: false,
      use_idle_mode: false,
      length_of_audio: 5,
      use_blink: true
    });

    console.log("Job object created, waiting for events...");

    for await (const msg of job) {
      console.log("EVENT:", JSON.stringify(msg).slice(0, 500));
    }

    console.log("Loop finished — no more events.");
  } catch (err) {
    console.error("CAUGHT ERROR:", err);
  }
}

generateTalkingVideo(
  "https://res.cloudinary.com/hn4pnhbm/image/upload/v1784780388/images/vt5jsnhz9tvtf7iywqde.jpg",
  "https://res.cloudinary.com/hn4pnhbm/video/upload/v1784783842/tts/lorrws3qz9teptznhr99.mp3"
).catch(err => console.error("TOP LEVEL ERROR:", err));
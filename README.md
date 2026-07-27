<div align="center">
  <img src="./frontend/public/logo.png" alt="Motion_It Logo" width="120" />
  <h1>Motion_It</h1>
  <p><strong>Transform static portraits into highly realistic, lip-synced AI presenters.</strong></p>
  <p>
    <img src="https://img.shields.io/badge/Status-Local_Development-success?style=for-the-badge" alt="Status" />
    <img src="https://img.shields.io/badge/Tech-Next.js_|_Express_|_MongoDB-blue?style=for-the-badge" alt="Tech Stack" />
    <img src="https://img.shields.io/badge/AI-MuseTalk_|_Chatterbox-purple?style=for-the-badge" alt="AI Models" />
  </p>
</div>

<br />

## 🎬 Demo

<video src="https://github.com/user-attachments/assets/e5941684-b76b-4c8d-bbaa-6bbf99edf1e8" controls width="600"></video>

<br />

## ✨ About The Product

**Motion_It** is an advanced AI video generation platform that breathes life into static imagery. By providing a single reference portrait and a driving audio file (or generating speech via Text-to-Speech), our engine perfectly syncs the facial movements and lip-sync of the subject to match the audio, outputting a high-fidelity speaking video.

Whether you're creating AI avatars for courses, automated marketing videos, or virtual presenters, Motion_It handles the complex orchestration of neural synthesis to deliver a premium, magical experience.

### Key Features
- 🖼️ **Portrait to Video:** Upload any portrait and bring it to life.
- 🎙️ **Audio-Driven Lipsync:** Highly accurate, frame-perfect lip synchronization.
- 💬 **Integrated TTS:** Type out a script and generate natural voiceovers.
- 🗄️ **User Dashboard:** A seamless Next.js frontend where users can manage, play, and download their generated videos tied to their accounts.

## 🚀 Development Status & Infrastructure

**Currently, Motion_It is designed for local development and research.** 

Because generating realistic lip-synced video relies on extremely heavy, state-of-the-art neural networks, **it strictly requires a dedicated GPU to run efficiently**. 

For this reason, the full end-to-end pipeline is currently running flawlessly in a local environment, but is not yet deployed for full production scale on standard cloud hosting. Full production would require deploying the inference endpoints to dedicated GPU cloud instances (like AWS EC2 g4dn/g5 instances or RunPod).

## 🛠️ Tech Stack

Motion_It is built on a modern, decoupled architecture ensuring the heavy AI workloads don't block the beautiful user interface.

- **Frontend:** Next.js, React, Tailwind CSS, Framer Motion
- **Backend API:** Node.js, Express.js
- **Database:** MongoDB (User Auth & Generation History)
- **Core AI Engine:** 
  - **[MuseTalk](https://github.com/Tencent/MuseTalk):** A real-time, high-quality audio-driven lip-syncing model used to manipulate the visual frames.
  - **Chatterbox:** Used for driving natural text-to-speech audio pipelines.

## 📦 Getting Started Locally

### 1. Start the Backend API (Node.js)
```bash
cd backend
npm install
npm run dev
```

### 2. Start the Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```

### 3. Start the Inference Engine (FastAPI)
Ensure you have your Python environment set up with PyTorch and CUDA.
```bash
# In your AI worker directory
uvicorn main:app --reload --port 7860
```

*(Note: Requires an NVIDIA GPU with at least 8GB VRAM for smooth generation).*

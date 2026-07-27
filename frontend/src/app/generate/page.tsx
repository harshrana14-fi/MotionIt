"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, Image as ImageIcon, Mic, Type, 
  Play, Loader2, Video, CheckCircle2, AlertCircle 
} from "lucide-react";
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";
import Container from "@/components/Container";
import { saveVideoGeneration } from "@/app/generate.actions";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export default function GeneratePage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [mode, setMode] = useState<"audio" | "tts">("audio");
  
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioPreview, setAudioPreview] = useState<string | null>(null);
  
  const [ttsText, setTtsText] = useState("");
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [resultVideoUrl, setResultVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFile(file);
      setAudioPreview(URL.createObjectURL(file));
      setError(null);
    }
  };

  const generateVideo = async () => {
    try {
      if (!imageFile) {
        setError("Please upload an avatar image.");
        return;
      }
      if (mode === "audio" && !audioFile) {
        setError("Please upload an audio file.");
        return;
      }
      if (mode === "tts" && !ttsText.trim()) {
        setError("Please enter text for speech generation.");
        return;
      }

      setIsGenerating(true);
      setError(null);
      setResultVideoUrl(null);

      // 1. Upload Image
      setLoadingStep("Uploading image...");
      const imageFormData = new FormData();
      imageFormData.append("image", imageFile);
      
      const imageRes = await fetch(`${BACKEND_URL}/api/upload/image`, {
        method: "POST",
        body: imageFormData,
      });
      const imageData = await imageRes.json();
      if (!imageData.success) throw new Error(imageData.message || "Failed to upload image");
      const imageUrl = imageData.imageUrl;

      let finalAudioUrl = "";

      // 2. Process Audio
      if (mode === "audio" && audioFile) {
        setLoadingStep("Uploading audio...");
        const audioFormData = new FormData();
        audioFormData.append("audio", audioFile);
        
        const audioRes = await fetch(`${BACKEND_URL}/api/upload/audio`, {
          method: "POST",
          body: audioFormData,
        });
        const audioData = await audioRes.json();
        if (!audioData.success) throw new Error(audioData.message || "Failed to upload audio");
        // Reusing upload controller logic, it returns imageUrl actually but it's an audio file url
        finalAudioUrl = audioData.imageUrl; 
      } else {
        setLoadingStep("Generating speech from text...");
        const ttsRes = await fetch(`${BACKEND_URL}/api/tts`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: ttsText }),
        });
        const ttsData = await ttsRes.json();
        if (!ttsData.success) throw new Error(ttsData.message || "Failed to generate speech");
        finalAudioUrl = ttsData.audioUrl;
      }

      // 3. Generate Video
      setLoadingStep("Orchestrating video generation (this may take a minute)...");
      const generateRes = await fetch(`${BACKEND_URL}/api/video/generate-video`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl,
          audioUrl: finalAudioUrl
        }),
      });
      
      const generateData = await generateRes.json();
      
      if (!generateData.success && !generateData.video_url) {
        throw new Error(generateData.message || "Video generation failed");
      }

      setResultVideoUrl(generateData.video_url);
      setLoadingStep("Saving to your account...");
      
      try {
        await saveVideoGeneration({
          imageUrl,
          audioUrl: finalAudioUrl,
          videoUrl: generateData.video_url,
        });
      } catch (saveErr) {
        console.error("Could not save to account, but video generated.", saveErr);
      }

      setLoadingStep("Completed!");
      
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <div className="noise-bg" aria-hidden="true" />
      <Navbar />

      <main className="relative min-h-screen pt-32 pb-24 z-10 text-gray-100 overflow-x-hidden">
        <Container>
          <div className="text-center mb-16 animate-fade-up">
            <h1 className="headline-tight text-4xl md:text-6xl mb-6">
              AI <span className="text-gradient font-display italic tracking-normal">Video Studio</span>
            </h1>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              Bring any portrait to life. Upload an image and add voice via audio file or text-to-speech.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            
            {/* LEFT COLUMN: Inputs */}
            <div className="flex flex-col gap-8">
              
              {/* Image Upload Area */}
              <div className="editorial-card rounded-3xl p-6 md:p-8 bg-surface-2/40 backdrop-blur-md relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-accent" />
                    Avatar Image
                  </h3>
                  <span className="label-caps">Step 1</span>
                </div>

                <div 
                  className="border-2 border-dashed border-border-strong rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:border-accent/50 hover:bg-surface/50 group/dropzone min-h-[280px]"
                  onClick={() => imageInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={imageInputRef}
                    onChange={handleImageUpload}
                  />
                  
                  {imagePreview ? (
                    <div className="relative w-full h-full min-h-[220px] rounded-xl overflow-hidden flex items-center justify-center">
                      <img src={imagePreview} alt="Avatar preview" className="max-h-[260px] object-contain rounded-xl z-10" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/dropzone:opacity-100 transition-opacity flex items-center justify-center z-20">
                        <p className="text-sm font-medium text-white flex items-center gap-2">
                          <Upload className="w-4 h-4" /> Replace Image
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-text-muted group-hover/dropzone:text-text-primary transition-colors">
                      <div className="w-12 h-12 rounded-full bg-surface-2 flex items-center justify-center mb-2">
                        <Upload className="w-5 h-5" />
                      </div>
                      <p className="font-medium text-sm">Click or drag image to upload</p>
                      <p className="text-xs text-text-faint">Supports JPG, PNG (Max 5MB)</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Audio/TTS Area */}
              <div className="editorial-card rounded-3xl p-6 md:p-8 bg-surface-2/40 backdrop-blur-md relative overflow-hidden group">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Mic className="w-5 h-5 text-accent" />
                    Voice Input
                  </h3>
                  <span className="label-caps">Step 2</span>
                </div>

                {/* Mode toggle */}
                <div className="flex p-1 bg-surface rounded-xl mb-6 border border-border">
                  <button 
                    onClick={() => setMode("audio")}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${
                      mode === "audio" ? "bg-surface-2 text-text-primary shadow-sm" : "text-text-muted hover:text-text-primary"
                    }`}
                  >
                    <Upload className="w-4 h-4" /> Upload Audio
                  </button>
                  <button 
                    onClick={() => setMode("tts")}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${
                      mode === "tts" ? "bg-surface-2 text-text-primary shadow-sm" : "text-text-muted hover:text-text-primary"
                    }`}
                  >
                    <Type className="w-4 h-4" /> Text to Speech
                  </button>
                </div>

                {/* Content based on mode */}
                <AnimatePresence mode="wait">
                  {mode === "audio" ? (
                    <motion.div
                      key="audio"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div 
                        className="border-2 border-dashed border-border-strong rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:border-accent/50 hover:bg-surface/50 min-h-[140px]"
                        onClick={() => audioInputRef.current?.click()}
                      >
                        <input 
                          type="file" 
                          accept="audio/*" 
                          className="hidden" 
                          ref={audioInputRef}
                          onChange={handleAudioUpload}
                        />
                        {audioFile ? (
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center">
                              <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <p className="text-sm font-medium">{audioFile.name}</p>
                            {audioPreview && (
                              <audio src={audioPreview} controls className="mt-2 w-full max-w-[240px] h-8" />
                            )}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2 text-text-muted">
                            <Upload className="w-5 h-5 mb-1" />
                            <p className="font-medium text-sm">Upload audio file</p>
                            <p className="text-xs text-text-faint">MP3 or WAV</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="tts"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <textarea
                        value={ttsText}
                        onChange={(e) => setTtsText(e.target.value)}
                        placeholder="Type exactly what you want your avatar to say..."
                        className="w-full h-[140px] bg-surface border border-border-strong rounded-2xl p-4 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 resize-none transition-colors"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

            {/* RIGHT COLUMN: Preview & Action */}
            <div className="flex flex-col h-full gap-6">
              
              <div className="editorial-card rounded-3xl p-1 bg-surface-2/40 backdrop-blur-md flex-1 min-h-[400px] flex flex-col relative overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
                
                {/* Result Area */}
                <div className="flex-1 bg-black/40 rounded-[1.35rem] m-1.5 flex flex-col items-center justify-center relative overflow-hidden z-10 border border-border/50">
                  
                  {isGenerating ? (
                    <div className="flex flex-col items-center gap-6 p-8 text-center max-w-sm">
                      <div className="relative">
                        <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full animate-pulse" />
                        <Loader2 className="w-12 h-12 text-accent animate-spin relative z-10" />
                      </div>
                      <div>
                        <h4 className="font-medium text-lg mb-2">Creating your video</h4>
                        <p className="text-sm text-text-muted">{loadingStep}</p>
                      </div>
                      
                      {/* Fake progress bar */}
                      <div className="w-full h-1.5 bg-surface-2 rounded-full overflow-hidden mt-2">
                        <div className="h-full bg-accent rounded-full w-1/3 animate-marquee" />
                      </div>
                    </div>
                  ) : resultVideoUrl ? (
                    <div className="w-full h-full relative group">
                      <video 
                        src={typeof resultVideoUrl === "string" ? resultVideoUrl : (resultVideoUrl as any).video || ""} 
                        controls 
                        className="w-full h-full object-contain"
                        autoPlay
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-4 text-text-muted opacity-60">
                      <Video className="w-12 h-12 stroke-[1.5]" />
                      <p className="text-sm font-medium">Ready to generate</p>
                    </div>
                  )}

                </div>
              </div>

              {error && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <button 
                onClick={generateVideo}
                disabled={isGenerating || (!imageFile)}
                className={`btn-primary w-full py-4 text-base shadow-lg shadow-accent/20 ${isGenerating ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-current" />
                    Generate Video
                  </>
                )}
              </button>

            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </>
  );
}

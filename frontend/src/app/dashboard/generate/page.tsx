"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, Image as ImageIcon, Mic, Type, 
  Play, Loader2, Video, CheckCircle2, AlertCircle, Sparkles
} from "lucide-react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export default function GenerateStudioPage() {
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

      // Deduct 5 credits simulated update
      const { addCredits } = await import("@/app/auth.actions");
      const creditRes = await addCredits(-5);
      if (!creditRes.success) {
        throw new Error(creditRes.error || "Insufficient credits.");
      }

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
      
      if (!generateData.success) {
        throw new Error(generateData.message || "Video generation failed");
      }

      setResultVideoUrl(generateData.data.video || generateData.videoUrl || generateData.data);
      setLoadingStep("Completed!");
      
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
            <Video className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Image to Video</h1>
            <p className="text-xs text-purple-400 font-semibold tracking-wider uppercase">Hallo3 AI Engine</p>
          </div>
        </div>
        <p className="text-sm text-white/50 mb-8 max-w-lg">
          Bring any portrait to life. Upload an avatar image and provide speech via audio upload or text-to-speech.
        </p>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left inputs */}
          <div className="flex flex-col gap-6">
            
            {/* Avatar upload */}
            <div
              className="p-6 rounded-2xl border"
              style={{
                background: "rgba(14, 14, 14, 0.8)",
                borderColor: "rgba(245, 245, 240, 0.08)",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-purple-400" />
                  Avatar Image
                </h3>
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Step 1</span>
              </div>

              <div 
                className="border-2 border-dashed border-white/5 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:border-purple-500/50 hover:bg-white/5 min-h-[220px]"
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
                  <div className="relative w-full h-full min-h-[160px] rounded-lg overflow-hidden flex items-center justify-center">
                    <img src={imagePreview} alt="Avatar preview" className="max-h-[180px] object-contain rounded-lg z-10" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                      <p className="text-xs font-semibold text-white flex items-center gap-2">
                        <Upload className="w-3.5 h-3.5" /> Replace Image
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors">
                    <Upload className="w-8 h-8 mb-1" />
                    <p className="font-medium text-xs">Upload avatar image</p>
                    <p className="text-[10px]">JPG, PNG (Max 5MB)</p>
                  </div>
                )}
              </div>
            </div>

            {/* Voice input */}
            <div
              className="p-6 rounded-2xl border"
              style={{
                background: "rgba(14, 14, 14, 0.8)",
                borderColor: "rgba(245, 245, 240, 0.08)",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Mic className="w-4 h-4 text-purple-400" />
                  Voice Input
                </h3>
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Step 2</span>
              </div>

              {/* Toggle */}
              <div className="flex p-1 bg-black/40 rounded-xl mb-4 border border-white/5">
                <button 
                  onClick={() => setMode("audio")}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    mode === "audio" ? "bg-white/5 text-white" : "text-white/40 hover:text-white"
                  }`}
                >
                  Upload Audio
                </button>
                <button 
                  onClick={() => setMode("tts")}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    mode === "tts" ? "bg-white/5 text-white" : "text-white/40 hover:text-white"
                  }`}
                >
                  Text to Speech
                </button>
              </div>

              {mode === "audio" ? (
                <div 
                  className="border-2 border-dashed border-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:border-purple-500/50 hover:bg-white/5 min-h-[120px]"
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
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <p className="text-xs font-medium text-white">{audioFile.name}</p>
                      {audioPreview && (
                        <audio src={audioPreview} controls className="mt-2 w-full max-w-[220px] h-7" />
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-white/30">
                      <Upload className="w-6 h-6" />
                      <p className="font-medium text-xs">Upload audio file</p>
                      <p className="text-[10px]">MP3 or WAV</p>
                    </div>
                  )}
                </div>
              ) : (
                <textarea
                  value={ttsText}
                  onChange={(e) => setTtsText(e.target.value)}
                  placeholder="Type exactly what you want your avatar to say..."
                  className="w-full h-[120px] bg-black/40 border border-white/5 rounded-xl p-3 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500/50 resize-none transition-colors"
                />
              )}
            </div>
          </div>

          {/* Right Preview */}
          <div className="flex flex-col gap-6">
            <div
              className="flex-1 rounded-2xl border min-h-[340px] flex flex-col items-center justify-center p-8 relative overflow-hidden"
              style={{
                background: "rgba(10, 10, 10, 0.6)",
                borderColor: "rgba(245, 245, 240, 0.05)",
              }}
            >
              {isGenerating ? (
                <div className="text-center space-y-4">
                  <div className="relative flex justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#c8f542] border-r-2 border-transparent"></div>
                    <Loader2 className="h-5 w-5 text-purple-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-white">Generating Talking Avatar</h4>
                    <p className="text-xs text-white/40 mt-1">{loadingStep}</p>
                  </div>
                </div>
              ) : resultVideoUrl ? (
                <div className="w-full h-full relative group flex items-center justify-center">
                  <video 
                    src={typeof resultVideoUrl === "string" ? resultVideoUrl : (resultVideoUrl as any).video || ""} 
                    controls 
                    className="max-h-[300px] object-contain rounded-xl"
                    autoPlay
                  />
                </div>
              ) : (
                <div className="text-center space-y-3 text-white/30">
                  <Video className="h-10 w-10 mx-auto" />
                  <p className="text-sm font-medium">Ready to generate</p>
                  <p className="text-xs max-w-xs mx-auto">Upload an image, pick a voice input method, and start creating.</p>
                </div>
              )}
            </div>

            {error && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <div
              className="p-4 rounded-xl border flex items-center justify-between"
              style={{ background: "rgba(245,245,240,0.02)", borderColor: "rgba(245,245,240,0.05)" }}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#c8f542]" />
                <span className="text-xs text-white/60">Generation Cost</span>
              </div>
              <span className="text-sm font-bold text-white">5 credits</span>
            </div>

            <button 
              onClick={generateVideo}
              disabled={isGenerating || !imageFile}
              className="w-full py-3.5 rounded-lg font-semibold text-xs flex items-center justify-center gap-2 transition-all text-bg cursor-pointer hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
              style={{
                backgroundColor: "#c8f542",
                boxShadow: "0 4px 20px -2px rgba(200, 245, 66, 0.25)",
              }}
            >
              {isGenerating ? "Processing Video..." : "Generate Talking Avatar"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

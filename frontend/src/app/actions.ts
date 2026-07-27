"use strict";

"use server";

import { connectToDatabase } from "@/db";
import { NewsletterSubscriber, DemoBooking, UserGeneration } from "@/db/schema";
import { revalidatePath } from "next/cache";

import { PRESET_AVATARS, PRESET_VOICES } from "@/lib/constants";

/**
 * Seed helper to generate initial community showcase if none exist
 */
async function ensureSeedData() {
  try {
    await connectToDatabase();
    const count = await UserGeneration.countDocuments();
    if (count === 0) {
      await UserGeneration.insertMany([
        {
          script: "Welcome to the next generation of visual storytelling. Today, we're building products that feel like magic.",
          avatarId: "elena",
          avatarName: "Elena Drake",
          voiceId: "voice-1",
          voiceName: "Bella (Warm Business - English US)",
          videoUrl: PRESET_AVATARS[0].videoUrl,
          imageUrl: PRESET_AVATARS[0].imageUrl,
          likes: 42,
        },
        {
          script: "Artificial Intelligence isn't about replacing human creators. It is about amplifying their voice 100x fold.",
          avatarId: "marcus",
          avatarName: "Dr. Marcus Vance",
          voiceId: "voice-2",
          voiceName: "David (Deep Authority - English UK)",
          videoUrl: PRESET_AVATARS[1].videoUrl,
          imageUrl: PRESET_AVATARS[1].imageUrl,
          likes: 56,
        },
        {
          script: "Check out my new AI video course! I generated all 12 modules from my kitchen in under an hour.",
          avatarId: "chloe",
          avatarName: "Chloe Bennett",
          voiceId: "voice-3",
          voiceName: "Serena (Energetic Creator - English AU)",
          videoUrl: PRESET_AVATARS[2].videoUrl,
          imageUrl: PRESET_AVATARS[2].imageUrl,
          likes: 29,
        }
      ]);
    }
  } catch (error) {
    console.error("Failed to seed initial user generations: ", error);
  }
}

/**
 * Fetch all generations
 */
export async function getGenerations() {
  await ensureSeedData();
  try {
    await connectToDatabase();
    // Use lean() and map to return plain objects for Next.js serialization
    const generations = await UserGeneration.find().sort({ createdAt: -1 }).lean();
    return generations.map(g => ({
      ...g,
      _id: g._id.toString(), // Convert ObjectId to string
      id: g._id.toString(),  // Keep id for compatibility
    }));
  } catch (err) {
    console.error("Failed to fetch generations:", err);
    return [];
  }
}

/**
 * Add a new user generation
 */
export async function createGeneration(formData: {
  script: string;
  avatarId: string;
  voiceId: string;
}) {
  if (!formData.script || formData.script.trim().length < 5) {
    throw new Error("Script must be at least 5 characters long.");
  }

  const avatar = PRESET_AVATARS.find((a) => a.id === formData.avatarId) || PRESET_AVATARS[0];
  const voice = PRESET_VOICES.find((v) => v.id === formData.voiceId) || PRESET_VOICES[0];

  try {
    await connectToDatabase();
    const inserted = await UserGeneration.create({
      script: formData.script.trim(),
      avatarId: avatar.id,
      avatarName: avatar.name,
      voiceId: voice.id,
      voiceName: voice.name,
      videoUrl: avatar.videoUrl,
      imageUrl: avatar.imageUrl,
      likes: 1,
    });

    revalidatePath("/");
    
    // Return a plain object
    const plainObj = inserted.toObject();
    return { 
      success: true, 
      generation: { ...plainObj, id: plainObj._id.toString(), _id: plainObj._id.toString() } 
    };
  } catch (err) {
    console.error("Failed to create generation:", err);
    return { success: false, error: "Database transaction failed." };
  }
}

/**
 * Like a generation
 */
export async function likeGeneration(id: string) {
  try {
    await connectToDatabase();
    const updated = await UserGeneration.findOneAndUpdate(
      { _id: id },
      { $inc: { likes: 1 } },
      { new: true }
    );
    
    if (updated) {
      revalidatePath("/");
      return { success: true, likes: updated.likes };
    }
    return { success: false, error: "Generation not found" };
  } catch (err) {
    console.error("Failed to like generation:", err);
    return { success: false, error: "Database transaction failed." };
  }
}

/**
 * Subscribe to newsletter
 */
export async function subscribeToNewsletter(email: string) {
  if (!email || !email.includes("@")) {
    return { success: false, error: "Please provide a valid email address." };
  }

  try {
    await connectToDatabase();
    await NewsletterSubscriber.create({ email: email.toLowerCase().trim() });
    return { success: true };
  } catch (err: any) {
    // Check unique violation (Mongoose code 11000)
    if (err?.code === 11000) {
      return { success: true, message: "Already subscribed!" };
    }
    console.error("Failed to subscribe email:", err);
    return { success: false, error: "Submission failed. Please try again." };
  }
}

/**
 * Book a demo session
 */
export async function bookDemo(data: {
  name: string;
  email: string;
  company: string;
  useCase: string;
}) {
  if (!data.name || !data.email || !data.company || !data.useCase) {
    return { success: false, error: "All fields are required." };
  }

  try {
    await connectToDatabase();
    await DemoBooking.create({
      name: data.name.trim(),
      email: data.email.toLowerCase().trim(),
      company: data.company.trim(),
      useCase: data.useCase.trim(),
    });
    return { success: true };
  } catch (err) {
    console.error("Failed to book demo:", err);
    return { success: false, error: "Failed to schedule demo. Please try again later." };
  }
}

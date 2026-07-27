"use server";

import { connectToDatabase } from "@/db";
import { UserGeneration, User } from "@/db/schema";
import { getSession } from "./auth.actions";
import { revalidatePath } from "next/cache";

export async function saveVideoGeneration({ 
  imageUrl, 
  audioUrl, 
  videoUrl 
}: { 
  imageUrl: string; 
  audioUrl: string; 
  videoUrl: string; 
}) {
  const session = await getSession();
  
  if (!session) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    await connectToDatabase();
    
    // Save the generation
    const generation = await UserGeneration.create({
      userId: session.id,
      imageUrl,
      audioUrl,
      videoUrl,
    });

    // Optional: Deduct credits (e.g., 5 credits per generation)
    // await User.findByIdAndUpdate(session.id, { $inc: { credits: -5 } });

    revalidatePath("/dashboard");
    
    return { success: true, generationId: generation._id.toString() };
  } catch (error) {
    console.error("Save Generation Error:", error);
    return { success: false, error: "Failed to save generation" };
  }
}

export async function getUserGenerations() {
  const session = await getSession();
  
  if (!session) {
    return { success: false, error: "Not authenticated", generations: [] };
  }

  try {
    await connectToDatabase();
    
    const generations = await UserGeneration.find({ userId: session.id })
      .sort({ createdAt: -1 })
      .lean();

    return { 
      success: true, 
      generations: generations.map((g: any) => ({
        id: g._id.toString(),
        imageUrl: g.imageUrl,
        audioUrl: g.audioUrl,
        videoUrl: g.videoUrl,
        createdAt: g.createdAt.toISOString(),
      })) 
    };
  } catch (error) {
    console.error("Get Generations Error:", error);
    return { success: false, error: "Failed to fetch generations", generations: [] };
  }
}

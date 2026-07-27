"use strict";

"use server";

import { connectToDatabase } from "@/db";
import { User } from "@/db/schema";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const JWT_SECRET = process.env.JWT_SECRET || "default_super_secret_key_change_me_in_production";
const JWT_SECRET_KEY = new TextEncoder().encode(JWT_SECRET);
const COOKIE_NAME = "motion_auth_token";

type SessionPayload = {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  credits: number;
};

async function createSessionToken(payload: SessionPayload) {
  return new SignJWT(payload as any)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET_KEY);
}

async function setSessionCookie(token: string) {
  (await cookies()).set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export async function register(data: any) {
  const { name, email, password } = data;
  if (!name || !email || !password) {
    return { success: false, error: "Missing required fields" };
  }
  try {
    await connectToDatabase();
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return { success: false, error: "Email is already registered" };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      avatarUrl: "",
      credits: 20,
    });
    const token = await createSessionToken({
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl,
      credits: user.credits,
    });
    await setSessionCookie(token);
    return { success: true };
  } catch (error) {
    console.error("Register Error:", error);
    return { success: false, error: "Registration failed. Please try again." };
  }
}

export async function login(data: any) {
  const { email, password } = data;
  if (!email || !password) {
    return { success: false, error: "Missing required fields" };
  }
  try {
    await connectToDatabase();
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !user.password) {
      return { success: false, error: "Invalid email or password" };
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return { success: false, error: "Invalid email or password" };
    }
    const token = await createSessionToken({
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl,
      credits: user.credits,
    });
    await setSessionCookie(token);
    return { success: true };
  } catch (error) {
    console.error("Login Error:", error);
    return { success: false, error: "Login failed. Please try again." };
  }
}

export async function logout() {
  (await cookies()).delete(COOKIE_NAME);
  return { success: true };
}

export async function getSession(): Promise<SessionPayload | null> {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET_KEY);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function getFullUser() {
  const session = await getSession();
  if (!session) return null;
  try {
    await connectToDatabase();
    const user = await User.findById(session.id).lean();
    if (!user) return null;
    const u = user as any;
    return {
      id: u._id.toString(),
      name: u.name,
      email: u.email,
      avatarUrl: u.avatarUrl || "",
      credits: u.credits ?? 20,
      createdAt: u.createdAt?.toString() || "",
    };
  } catch {
    return null;
  }
}

export async function updateProfile(data: { name?: string; avatarUrl?: string; password?: string }) {
  const session = await getSession();
  if (!session) return { success: false, error: "Not authenticated" };
  try {
    await connectToDatabase();
    const updateFields: any = {};
    if (data.name) updateFields.name = data.name.trim();
    if (data.avatarUrl !== undefined) updateFields.avatarUrl = data.avatarUrl;
    if (data.password) {
      if (data.password.length < 6) return { success: false, error: "Password must be at least 6 characters" };
      updateFields.password = await bcrypt.hash(data.password, 10);
    }
    const user = await User.findByIdAndUpdate(session.id, updateFields, { new: true });
    if (!user) return { success: false, error: "User not found" };
    // Refresh session cookie with new data
    const token = await createSessionToken({
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl,
      credits: user.credits,
    });
    await setSessionCookie(token);
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("UpdateProfile Error:", error);
    return { success: false, error: "Update failed. Please try again." };
  }
}

export async function addCredits(amount: number) {
  const session = await getSession();
  if (!session) return { success: false, error: "Not authenticated" };
  try {
    await connectToDatabase();
    const user = await User.findByIdAndUpdate(session.id, { $inc: { credits: amount } }, { new: true });
    if (!user) return { success: false, error: "User not found" };
    const token = await createSessionToken({
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl,
      credits: user.credits,
    });
    await setSessionCookie(token);
    revalidatePath("/dashboard");
    return { success: true, credits: user.credits };
  } catch (error) {
    console.error("AddCredits Error:", error);
    return { success: false, error: "Failed to add credits." };
  }
}

import mongoose from "mongoose";
import { connectToDatabase } from "@/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();
    const isConnected = mongoose.connection.readyState === 1;
    if (isConnected) {
      return Response.json({ ok: true });
    } else {
      return Response.json({ ok: false, error: "Database not connected" }, { status: 500 });
    }
  } catch (err: any) {
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}

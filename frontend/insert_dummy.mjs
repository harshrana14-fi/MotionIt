

// Let's just create a Mongoose script to manually insert a generation WITH a userId
import mongoose from "mongoose";

const uri = process.env.DATABASE_URL || "mongodb+srv://fry2006day13_db_user:02iLSCXrolIa4Scf@cluster0.u5eunqq.mongodb.net/heygen";

async function addDummy() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  
  // Find a user ID to link to
  const user = await db.collection("users").findOne({});
  if (!user) {
    console.log("No users found");
    process.exit(1);
  }
  
  console.log("Found user:", user._id);
  
  await db.collection("usergenerations").insertOne({
    userId: user._id.toString(),
    imageUrl: "https://example.com/image.jpg",
    audioUrl: "https://example.com/audio.mp3",
    videoUrl: "https://videos.pexels.com/video-files/8627759/8627759-hd_1080_1920_25fps.mp4",
    createdAt: new Date()
  });
  
  console.log("Inserted dummy generation");
  process.exit(0);
}

addDummy();

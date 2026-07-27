import mongoose from "mongoose";

const uri = process.env.DATABASE_URL || "mongodb+srv://fry2006day13_db_user:02iLSCXrolIa4Scf@cluster0.u5eunqq.mongodb.net/heygen";

async function check() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  const collections = await db.listCollections().toArray();
  console.log("Collections:", collections.map(c => c.name));
  
  if (collections.some(c => c.name === "usergenerations")) {
    const data = await db.collection("usergenerations").find().toArray();
    console.log("usergenerations count:", data.length);
    console.log("usergenerations sample:", data.slice(0, 2));
  } else {
    console.log("No usergenerations collection found");
  }
  
  process.exit(0);
}
check();

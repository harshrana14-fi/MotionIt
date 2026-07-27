import { connectToDatabase } from "./src/db/index.js";
import { UserGeneration } from "./src/db/schema.js";

async function check() {
  await connectToDatabase();
  const count = await UserGeneration.countDocuments();
  console.log("Total generations:", count);
  const all = await UserGeneration.find().lean();
  console.log(all);
  process.exit(0);
}
check();

import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

//const client = new MongoClient(process.env.MONGO_URI);

let db;

const MONGO_URL = "mongodb://root:password@localhost:27017/?authSource=admin";
const DB_NAME = "vip";

export async function connectDB() {
  try {
     const client = new MongoClient(MONGO_URL);
    await client.connect();
    //await client.connect();
    //db = client.db();
    db = client.db(DB_NAME);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ DB connection error:", err);
  }
}

export function getDB() {
  return db;
}
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import usersRouter from "./routes/users.js";

dotenv.config();

const app = express();
app.use(express.json());

// routes
app.use("/users", usersRouter);

app.listen(process.env.PORT, () => {
  console.log(`🚀 API running at http://localhost:${process.env.PORT}`);
  connectDB();
  
});
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dogRoutes from "./routes/dogRoutes";
import kennelRoutes from "./routes/kennelRoutes";

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI!, {
    dbName: "dogs",
  })
  .then(() => {
    console.log("MongoDB connected!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// API Routes
app.use("/api/dogs", dogRoutes);
app.use("/api/kennels", kennelRoutes);

console.log(PORT, "PORT");

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});

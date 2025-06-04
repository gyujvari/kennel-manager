import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dogRoutes from "./routes/dogRoutes";
import kennelRoutes from "./routes/kennelRoutes";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB kapcsolódás
mongoose
  .connect(process.env.MONGO_URI!, {
    // a '!' jelzi, hogy biztos nem undefined
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

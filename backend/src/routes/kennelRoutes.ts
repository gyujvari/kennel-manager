import express from "express";
import Kennel from "../models/kennel.model";

const router = express.Router();

// GET all kennels
router.get("/", async (req, res) => {
  try {
    const kennels = await Kennel.find();
    res.json(kennels);
  } catch (err) {
    res.status(500).json({ error: "Failed to get kennels" });
  }
});

export default router;

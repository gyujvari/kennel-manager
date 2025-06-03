import express from "express";
import Dog from "../models/dog.model";

const router = express.Router();

// GET all dogs
router.get("/", async (req, res) => {
  const dogs = await Dog.find();
  res.json(dogs);
});

// POST new dog
router.post("/", async (req, res) => {
  const { name, chipNumber, kennelId } = req.body;
  const newDog = new Dog({ name, chipNumber, kennelId });
  await newDog.save();
  res.status(201).json(newDog);
});

// PUT update dog's kennel
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { kennelId } = req.body;
  const dog = await Dog.findByIdAndUpdate(id, { kennelId }, { new: true });
  if (!dog) return res.status(404).json({ error: "Dog not found" });
  res.json(dog);
});

// DELETE dog
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const dog = await Dog.findByIdAndDelete(id);
  if (!dog) return res.status(404).json({ error: "Dog not found" });
  res.json({ message: "Dog deleted" });
});

export default router;

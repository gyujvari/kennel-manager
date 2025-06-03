import mongoose from "mongoose";
import Kennel from "./models/kennel.model";
import Dog from "./models/dog.model";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/kennelmanager";

const kennelsData = [
  { name: "Kennel A" },
  { name: "Kennel B" },
  { name: "Kennel C" },
  { name: "Kennel D" },
  { name: "Kennel E" },
  { name: "Kennel F" },
];

const freeDogsData = [
  { name: "Rex", chipNumber: "123" },
  { name: "Bundi", chipNumber: "456" },
  { name: "Buksi", chipNumber: "789" },
  { name: "Morzsi", chipNumber: "012" },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI, { dbName: "dogs" });
    console.log("Connected to MongoDB");

    await Kennel.deleteMany({});
    await Dog.deleteMany({});

    const kennels = await Kennel.insertMany(kennelsData);
    console.log("Kennels inserted");

    const dogsWithKennel = freeDogsData.map((dog) => ({
      ...dog,
      kennelId: kennels[0]._id,
    }));

    await Dog.insertMany(dogsWithKennel);
    console.log("Free dogs inserted");

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (err) {
    console.error(err);
  }
}

seed();

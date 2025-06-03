import mongoose from "mongoose";

const kennelSchema = new mongoose.Schema({
  name: String,
  dogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dog",
    },
  ],
});

export default mongoose.model("Kennel", kennelSchema);

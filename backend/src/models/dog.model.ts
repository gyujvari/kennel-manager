import mongoose from "mongoose";

const dogSchema = new mongoose.Schema({
  name: String,
  chipNumber: String,
  kennelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Kennel",
    required: false,
  },
});

export default mongoose.model("Dog", dogSchema);

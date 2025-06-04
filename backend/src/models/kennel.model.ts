import mongoose from "mongoose";

const kennelSchema = new mongoose.Schema({
  name: String,
});

export default mongoose.model("Kennel", kennelSchema);

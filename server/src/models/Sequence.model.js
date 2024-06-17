import mongoose from "mongoose";

const SequenceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    value: { type: Number, required: true },
  },
  { timestamps: true }
);

const Sequence = mongoose.model("Sequence", SequenceSchema);
export default Sequence;

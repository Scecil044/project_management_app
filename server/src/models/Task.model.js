import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    contributors: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    // department: { type: mongoose.Types.ObjectId, ref: "Department" },
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "started", "completed"],
      default: "pending",
    },
    isDeleted: { type: Boolean, default: false },
    createdBy: { type: mongoose.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Types.ObjectId, ref: "User" },
    deletedBy: { type: mongoose.Types.ObjectId, ref: "User" },
    deletedAt: { type: Date },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", TaskSchema);
export default Task;

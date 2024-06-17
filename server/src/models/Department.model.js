import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema(
  {
    manager: { type: mongoose.Types.ObjectId, ref: "User" },
    members: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    departmentName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
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

const Department = mongoose.model("Department", DepartmentSchema);
export default Department;

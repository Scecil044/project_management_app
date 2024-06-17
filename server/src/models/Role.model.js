import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema(
  {
    roleName: {
      type: String,
      required: true,
      unique: true,
      default: "user",
      enum: ["user", "administrator", "superAdmin", "manager"],
    },
    roleId: {
      type: Number,
      unique: [true, "RoleId is a unique filed"],
      enum: [1, 2, 3, 4],
      default: 3,
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

const Role = mongoose.model("Role", RoleSchema);
export default Role;

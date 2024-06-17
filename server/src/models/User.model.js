import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";

const UserSchema = new mongoose.Schema(
  {
    role: {
      type: mongoose.Types.ObjectId,
      ref: "Role",
      default: new ObjectId("666d8eb8b5f7a493509bf91f"),
    }, // "user role"
    department: { type: mongoose.Types.ObjectId, ref: "Department" },
    tasks: [{ type: mongoose.Types.ObjectId, ref: "Task" }],
    firstName: { type: String, requird: true },
    lastName: { type: String, requird: true },
    email: {
      type: String,
      requird: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    personal: {
      type: Object,
      default: {
        gender: "",
        phone: "",
        age: "",
      },
    },
    profilePicture: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyCbJoUCRscGfzySEtqoR5HtHnEOE0ux4r-A&s",
    },
    employeeNumber: { type: String, unique: true },
    password: { type: String, requird: true },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
    createdBy: { type: mongoose.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Types.ObjectId, ref: "User" },
    deletedBy: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

UserSchema.methods.comparePassword = async function (pass) {
  return await bcrypt.compare(pass, this.password);
};

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    if (!this.password) {
      throw new Error("Password is undefined");
    }
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", UserSchema);
export default User;

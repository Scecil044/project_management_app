import Sequence from "../models/Sequence.model.js";
import User from "../models/User.model.js";
import { generateEmployeeNumber } from "../utils/generateEmployeeNumber.js";
import { findDepartmentById } from "./department.service.js";
import { findRoleById } from "./role.service.js";
import { findUserByEmail } from "./user.service.js";

export const registerNewUser = async (reqBody, userId) => {
  const isUser = await findUserByEmail(reqBody.email);
  if (isUser) throw new Error("Email taken!");

  const newUser = await User.create({
    firstName: reqBody.firstName,
    lastName: reqBody.lastName,
    password: reqBody.password,
    email: reqBody.email,
    personal: {
      gender: reqBody.gender || "",
      phone: reqBody.phone || "",
      age: reqBody.age || "",
    },
  });

  // Generate unique employee number
  const empNumber = await generateEmployeeNumber();
  newUser.employeeNumber = empNumber;
  if (reqBody.department) {
    const department = await findDepartmentById(reqBody.department);
    if (!department)
      throw new Error(
        "No department is registered under the provided id in the database"
      );
    newUser.Department = department._id;
  }
  if (reqBody.user && reqBody.user != "") {
    newUser.createdBy = reqBody.user;
  }
  if (reqBody.role && reqBody.role != "") {
    const role = await findRoleById(reqBody.role);
    if (!role) throw new Error("could not find role by the provided id");
    newUser.role = reqBody.role;
  }

  await newUser.save();
  return newUser;
};

export const loginUser = async (reqBody) => {
  const isUser = await findUserByEmail(reqBody.email);
  if (!isUser) throw new Error("Invalid credentials!");
  const isPassword = await isUser.comparePassword(reqBody.password);
  if (!isPassword) throw new Error("Invalid credentials!");

  return isUser;
};

export const logoutUser = (res) => {
  return res.clearCookie("access_token");
};

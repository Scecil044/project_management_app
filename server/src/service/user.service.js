import User from "../models/User.model.js";
import { cleaneUserObject } from "../utils/cleanUserObject.js";
import { findDepartmentById } from "./department.service.js";
import { findRoleById } from "./role.service.js";
import { ObjectId } from "mongodb";

export const findUserByEmail = async (email) => {
  return await User.findOne({ email, isDeleted: false }).populate({
    path: "role",
    select: "roleName",
  });
};

export const findUserById = async (userId) => {
  return await User.findOne({ _id: userId, isDeleted: false })
    .populate({
      path: "createdBy",
      select: "firstName lastName email",
    })
    .populate({
      path: "role",
      select: "roleName",
    })
    .populate({
      path: "department",
      populate: {
        path: "manager",
        select: "firstName lastName email",
      },
      select: "departmentName",
    });
};

export const getSystemUsers = async (searchQuery) => {
  const users = await User.find({ isDeleted: false })
    .populate({
      path: "createdBy",
      select: "firstName lastName email",
    })
    .populate({
      path: "role",
      select: "roleName",
    })
    .populate({
      path: "department",
      populate: {
        path: "manager",
        select: "firstName lastName email phone",
      },
      select: "departmentName",
    });
  const filteredData = users.map((user) => {
    return cleaneUserObject(user);
  });
  return filteredData;
};

export const updateUserDetails = async (reqBody, userId) => {
  const isUser = await findUserById(userId);

  if (!isUser) throw new Error("Could not find user with matching id");
  if (
    reqBody.age !== undefined ||
    reqBody.phone !== undefined ||
    reqBody.gender !== undefined
  ) {
    isUser.personal = {
      ...isUser.personal,
      ...(reqBody.age !== undefined && { age: reqBody.age }),
      ...(reqBody.phone !== undefined && { phone: reqBody.phone }),
      ...(reqBody.gender !== undefined && { gender: reqBody.gender }),
    };
  }
  const updates = Object.keys(reqBody);
  console.log(updates, "++");
  updates.forEach((update) => {
    isUser[update] = reqBody[update];
  });
  if (reqBody.role) {
    const role = await findRoleById(reqBody.role);
    if (!role) throw new Error("could not find role with the provided id");
    isUser.role = reqBody.role;
  }
  if (reqBody.department) {
    const department = await findDepartmentById(reqBody.department);
    console.log(department);
    if (!department)
      throw new Error("The department referred is non-existant in the db");
    isUser.department = department._id;
    const isExistingMember = department.members.some((item) =>
      item.equals(new ObjectId(userId))
    );
    if (isExistingMember)
      throw new Error("This member is in the list of this departments members");
    if (department.members.length > 0) {
      department.members.unshift(isUser._id);
    } else {
      department.members.push(isUser._id);
    }
    await department.save();
  }

  isUser.updatedAt = new Date();
  await isUser.save();
  const data = await findUserById(isUser._id);
  const result = cleaneUserObject(data);
  return result;
};

export const markUserAsDeleted = async (userId) => {
  const isUser = await findUserById(userId);
  if (!isUser) throw new Error("Could not find user with matching id");
  isUser.isDeleted = !isUser.isDeleted;

  await isUser.save();
  const result = cleaneUserObject(isUser);
  return result;
};

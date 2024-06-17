import { ObjectId } from "mongodb";
import Department from "../models/Department.model.js";
import { findUserById } from "./user.service.js";
import User from "../models/User.model.js";

export const gestSystemDepartments = async () => {
  const departments = await Department.find({
    isDeleted: false,
  })
    .populate({
      path: "manager",
      select: "firstName lastName email phone personal createdAt updatedAt",
    })
    .populate({
      path: "createdBy",
      select: "firstName lastName email",
    });
  return departments;
};

export const findDepartmentByName = async (departmentName) => {
  const normalizedName = departmentName.toLowerCase();
  return await Department.findOne({
    departmentName: normalizedName,
  }).populate({
    path: "manager",
    select: "firstName lastName email",
  });
};

export const findDepartmentById = async (departmentId) => {
  return await Department.findOne({
    _id: departmentId,
    isDeleted: false,
  }).populate({
    path: "manager",
    select: "firstName lastName email",
  });
};

export const addNewDepartment = async (reqBody, userId) => {
  const isDepartment = await findDepartmentByName(reqBody.departmentName);
  if (isDepartment)
    throw new Error("A department with a similar name already exists!");
  const isUser = await findUserById(userId);
  if (!isUser) throw new Error("Could not find user by the provided id");
  const user = await findUserById(reqBody.manager);
  if (user.role.roleName != "manager")
    throw new Error("select a user with manager status");

  const department = new Department({
    departmentName: reqBody.departmentName,
    createdBy: userId,
    manager: reqBody.manager,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  await department.save();
  const finalResult = await findDepartmentByName(reqBody.departmentName);
  return finalResult;
};

export const updateDeartmentDetails = async (reqBody, departmentId) => {
  const isDepartment = await findDepartmentById(departmentId);
  if (!isDepartment)
    throw new Error("could not find department with matching id");
  const updates = Object.keys(reqBody);
  updates.forEach((update) => {
    isDepartment[update] = reqBody[update];
  });
  await isDepartment.save();
  const finalResult = await findDepartmentById(departmentId);
  return finalResult;
};

export const discardDepartment = async (departmentId) => {
  const isDepartment = await findDepartmentById(departmentId);
  if (!isDepartment)
    throw new Error("could not find department with matching id");
  isDepartment.isDeleted = !isDepartment.isDeleted;
  await isDepartment.save();
  return isDepartment;
};

export const removeMember = async (departmentId, memberId) => {
  const isDepartment = await findDepartmentById(departmentId);
  if (!isDepartment)
    throw new Error("Could not find department by the provided id");
  const isMember = isDepartment.members.some((item) =>
    item.equals(new ObjectId(memberId))
  );
  if (!isMember) {
    throw new Error("Member not found in the department");
  }

  // Remove the member from the department's members array
  isDepartment.members = isDepartment.members.filter(
    (item) => !item.equals(new ObjectId(memberId))
  );
  await isDepartment.save();

  await User.updateOne(
    {
      _id: new ObjectId(memberId),
      isDeleted: false,
    },
    { $set: { department: null } }
  );
  const result = await findDepartmentById(isDepartment._id);
  return result;
};

import Task from "../models/Task.model.js";
import User from "../models/User.model.js";
import { findDepartmentByName } from "./department.service.js";
import { findUserById } from "./user.service.js";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

export const findTaskById = async (taskId) => {
  return Task.findOne({ _id: taskId, isDeleted: false })
    .populate({
      path: "contributors",
      select: "firstName lastName email",
    })
    .populate({
      path: "createdBy",
      select: "firstName lastName email phone",
    });
};

export const listSystemTasks = async () => {
  return Task.find({ isDeleted: false })
    .populate({
      path: "contributors",
      select: "firstName lastName email phone ",
    })
    .populate({
      path: "createdBy",
      select: "firstName lastName email phone",
    });
};

export const addNewTask = async (reqBody, useriD) => {
  //   const department = await findDepartmentByName(reqBody.departmentName);
  //   if (!department) throw new Error("Unable to get department");
  console.log(useriD);
  const contributors = Array.isArray(reqBody.contributors)
    ? reqBody.contributors
    : [reqBody.contributors];

  for (let contributorId of contributors) {
    const isUser = await findUserById(contributorId);
    if (!isUser)
      throw new Error(
        `NO user with id ${contributorId} was found in the database`
      );
  }
  const newTask = await Task.create({
    title: reqBody.title,
    // department: department._id,
    description: reqBody.description,
    createdBy: useriD,
    createdAt: new Date(),
    updatedAt: new Date(),
    updatedBy: useriD,
    contributors: contributors,
  });

  for (const contributorId of contributors) {
    await User.findByIdAndUpdate(contributorId, {
      $push: { tasks: newTask._id },
    });
  }

  return newTask;
};

export const updateTaskDetails = async (reqBody, taskId) => {
  const task = await findTaskById(taskId);
  if (!task) throw new Error("could not find task by the provided id");
  const updates = Object.keys(reqBody);
  updates.forEach((update) => {
    task[update] = reqBody[update];
  });
  if (reqBody.contributors) {
    var contributors = Array.isArray(reqBody.contributors)
      ? reqBody.contributors
      : [reqBody.contributors];

    for (let contributor of contributors) {
      const isUser = await User.findOne({ _id: contributor });
      if (!isUser)
        throw new Error(`contributor ${contributor} is not a valid id`);
      if (!isUser.tasks) {
        isUser.tasks = [];
      }
      if (!isUser.tasks.includes(taskId)) {
        isUser.tasks.push(taskId);
      }
      await isUser.save();
    }

    const newContributors = task.contributors.filter(
      (contributor) => !task.contributors.includes(contributor)
    );
    task.contributors = [...newContributors, ...task.contributors];
  }
  await task.save();
  const result = await findTaskById(taskId);
  return result;
};

export const discardTask = async (taskId, userId) => {
  const isTask = await findTaskById(taskId);
  if (!isTask) throw new Error("Task not found in DB");
  isTask.isDeleted = true;
  await isTask.save();

  const usersWithTask = await User.find({
    tasks: isTask._id,
  });
  for (const user of usersWithTask) {
    user.tasks = user.tasks.filter((task) => !task.equals(taskId));
    await user.save();
  }
  return isTask;
};

export const unlinkContributor = async (userId, taskId) => {
  try {
    const isTask = await findTaskById(taskId);
    if (!isTask) throw new Error("Could not find task");

    isTask.contributors = isTask.contributors.filter(
      (item) => !item.equals(new ObjectId(userId))
    );
    await isTask.save();

    const isUser = await findUserById(userId);
    if (!isUser) throw new Error("Invalid user Id");

    isUser.tasks = isUser.tasks.filter(
      (task) => !task.equals(new ObjectId(taskId))
    );
    await isUser.save();

    const finalObject = await findTaskById(taskId);
    return finalObject;
  } catch (error) {
    throw new Error(error.message);
  }
};

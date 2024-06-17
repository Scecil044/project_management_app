import {
  findUserById,
  getSystemUsers,
  markUserAsDeleted,
  updateUserDetails,
} from "../service/user.service.js";
import { cleaneUserObject } from "../utils/cleanUserObject.js";
import { errorHandler } from "../utils/error.js";

export const getUsers = async (req, res, next) => {
  try {
    const result = await getSystemUsers(req.query);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await findUserById(req.params.userId);
    if (!user)
      return next(errorHandler(400, "Unbale to fecth user by the provided id"));
    const result = cleaneUserObject(user);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    console.log(req.body, "______", req.params.userId);
    const data = await updateUserDetails(req.body, req.params.userId);
    if (!data) return next(errorHandler(400, "Unable to update user details"));
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const data = await markUserAsDeleted(req.params.userId);
    if (!data)
      return next(errorHandler(400, "Unable to mark user as deleted!"));
    res.status(200).json("User deleted!");
  } catch (error) {
    next(error);
  }
};

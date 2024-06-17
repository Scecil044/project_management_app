import {
  addNewTask,
  discardTask,
  findTaskById,
  listSystemTasks,
  unlinkContributor,
  updateTaskDetails,
} from "../service/task.service.js";
import { errorHandler } from "../utils/error.js";

export const createTask = async (req, res, next) => {
  try {
    const requiredFields = ["title", "description"];
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0)
      return next(
        errorHandler(
          400,
          `Please provide the missing fields: ${missingFields.join(", ")}`
        )
      );
    const result = await addNewTask(req.body, req.user.id);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getTask = async (req, res, next) => {
  try {
    const data = await findTaskById(req.params.taskId);
    if (!data)
      return next(errorHandler(400, "could not find task by the provided id"));
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const data = await listSystemTasks();
    if (!data) return next(errorHandler(400, "could not list system tasks"));
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const data = await updateTaskDetails(req.body, req.params.taskId);
    if (!data) return next(errorHandler(400, "could not complete action"));
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const response = await discardTask(req.params.taskId);
    if (!response) return next(errorHandler(400, "unable to delete task"));
    res.status(200).json("Task deleted successfully!");
  } catch (error) {
    next(error);
  }
};

export const removeContributor = async (req, res, next) => {
  try {
    const response = await unlinkContributor(
      req.params.userId,
      req.params.taskId
    );
    if (!response)
      return next(errorHandler(400, "unable to unlink contributor"));
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

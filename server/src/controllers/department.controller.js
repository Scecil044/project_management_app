import {
  addNewDepartment,
  discardDepartment,
  findDepartmentById,
  gestSystemDepartments,
  removeMember,
  updateDeartmentDetails,
} from "../service/department.service.js";
import { errorHandler } from "../utils/error.js";

export const createDepartment = async (req, res, next) => {
  try {
    const requiredFields = ["departmentName", "manager"];
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0)
      return next(
        errorHandler(400, `Provide missing fields: ${missingFields.join(", ")}`)
      );
    const result = await addNewDepartment(req.body, req.user.id);
    if (!result)
      return next(errorHandler(400, "could not complete create action"));
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getDepartment = async (req, res, next) => {
  try {
    const result = await findDepartmentById(req.params.departmentId);
    if (!result)
      return next(
        errorHandler(400, "Could not get department with matching id")
      );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getDepartments = async (req, res, next) => {
  try {
    const data = await gestSystemDepartments();
    if (!data) return next(errorHandler(400, "could not list departments"));
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const updateDepartment = async (req, res, next) => {
  try {
    const result = await updateDeartmentDetails(
      req.body,
      req.params.departmentId
    );
    if (!result)
      return next(errorHandler(400, "could not complete update action"));
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteDepartment = async (req, res, next) => {
  try {
    const response = await discardDepartment(req.params.departmentId);
    if (!response)
      return next(errorHandler(400, "could not complete delete action"));
    res.status(200).json("Department deleted successfully!");
  } catch (error) {
    next(error);
  }
};

export const removeUserFromDepartment = async (req, res, next) => {
  try {
    const result = await removeMember(
      req.params.departmentId,
      req.params.userId
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

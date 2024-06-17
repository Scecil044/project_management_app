import {
  createUserRole,
  discardRole,
  findRoleById,
  findSystemRoles,
  updateRoleDetails,
} from "../service/role.service.js";
import { errorHandler } from "../utils/error.js";

export const createRole = async (req, res, next) => {
  try {
    const requiredFields = ["roleName", "roleId"];
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0)
      return next(
        errorHandler(
          400,
          `Please provide all required fields: ${missingFields.join(" ,")}`
        )
      );
    const data = await createUserRole(req.body, req.user.id);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getRole = async (req, res, next) => {
  try {
    const role = await findRoleById(req.params.roleId);
    if (!role)
      return next(errorHandler(400, "Could not find role with matching id"));
    res.status(200).json(role);
  } catch (error) {
    next(error);
  }
};

export const getRoles = async (req, res, next) => {
  try {
    const result = await findSystemRoles();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateRole = async (req, res, next) => {
  try {
    const data = await updateRoleDetails(req.body, req.params.roleId);
    if (!data) return next(errorHandler(400, "could not update role!"));
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const deleteRole = async (req, res, next) => {
  try {
    const result = await discardRole(req.params.roleId, req.user.id);
    if (!result)
      return next(errorHandler(400, "could not complete delete action!"));
    res.status(200).json("role deleted successfully!")
  } catch (error) {
    next(error);
  }
};

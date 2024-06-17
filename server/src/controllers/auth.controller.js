import {
  loginUser,
  logoutUser,
  registerNewUser,
} from "../service/auth.service.js";
import { cleaneUserObject } from "../utils/cleanUserObject.js";
import { errorHandler } from "../utils/error.js";
import { generateAuthToken } from "../utils/token.js";

export const register = async (req, res, next) => {
  try {
    const requiredFields = [
      "email",
      "password",
      "firstName",
      "lastName",
      "gender",
    ];
    const missingFields = requiredFields.filter((filed) => !req.body[filed]);
    if (missingFields.length > 0)
      return next(
        errorHandler(
          400,
          `Please provide missing fields: ${missingFields.join(",")}`
        )
      );
    const user = await registerNewUser(req.body, req?.user?.id);
    const refinedUserObject = cleaneUserObject(user);
    res.status(200).json(refinedUserObject);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const requiredFields = ["email", "password"];
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return next(
        errorHandler(
          400,
          `Please provide all required fields: ${missingFields.join(",")}`
        )
      );
    }
    const data = await loginUser(req.body);
    const refinedUserObject = cleaneUserObject(data);
    const token = generateAuthToken(data);
    res
      .cookie("access_token", token, { httpOnly: true, expiresIn: "3d" })
      .status(200)
      .json(refinedUserObject);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const response = logoutUser(res);
    if (!response) return next(errorHandler(400, "Unable to logout user"));
    res.status(200).json("Logout successful");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const googleAuth = async () => {
  try {
  } catch (error) {
    next(error);
  }
};

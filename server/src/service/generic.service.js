import Department from "../models/Department.model.js";
import Role from "../models/Role.model.js";
import Task from "../models/Task.model.js";
import User from "../models/User.model.js";
import { errorHandler } from "../utils/error.js";

export const genericFilter = async (reqBody, reqQuery) => {
  try {
    console.log(reqQuery);
    let result;
    const query = new RegExp(reqQuery.search, "i");
    const limit = reqQuery.limit ? parseInt(reqQuery.limit) : 20;
    const page = reqQuery.pages ? parseInt(reqQuery.pages) : 1;
    const sort = reqQuery.sortOrder ? parseInt(reqQuery.sortOrder) : -1;
    const sortBy = reqQuery.sortBy || "createdAt";

    let pipeline = [];
    switch (reqBody.module.toLowerCase()) {
      case "user":
        pipeline = [
          {
            $lookup: {
              from: "roles",
              foreignField: "role",
              localField: "_id",
              as: "roleDetails",
            },
          },
          {
            $unwind: "$roleDetails",
          },
          {
            $match: {
              isDeleted: false,
              $or: [
                { firstName: { $regex: query } },
                { lastName: { $regex: query } },
                { email: { $regex: query } },
                { phone: { $regex: query } },
                { "roleDtails.roleName": { $regex: query } },
              ],
            },
          },
          {
            $project: {
              firstName: 1,
              lastName: 1,
              email: 1,
              phone: 1,
              role: {
                _id: "$roleDetails._id",
                roleName: "$roleDetails.roleName",
              },
              createdAt: 1,
            },
          },
          { $sort: { [sortBy]: sort } },
          { $skip: (page - 1) * limit },
          { $limit: limit },
        ];
        break;
      case "department":
        pipeline = [
          {
            $lookup: {
              from: "users",
              foreignField: "_id",
              localField: "manager",
              as: "managerDetails",
            },
          },
          {
            $unwind: "$managerDetails",
          },
          {
            $match: {
              isDeleted: false,
              $or: [
                { departmentName: { $regex: query } },
                { "managerDetails.firstName": { $regex: query } },
                { "managerDetails.lastName": { $regex: query } },
                { "managerDetails.email": { $regex: query } },
                { "managerDetails.phone": { $regex: query } },
              ],
            },
          },
          {
            $project: {
              departmentName: 1,
              manager: {
                _id: "$managerDetails._id",
                firstName: "$managerDetails.firstName",
                lastName: "$managerDetails.lastName",
                email: "$managerDetails.email",
                phone: "$managerDetails.phone",
              },
              createdAt: 1,
            },
          },
          { $sort: { [sortBy]: sort } },
          { $skip: (page - 1) * limit },
          { $limit: limit },
        ];
        break;
      case "task":
        pipeline = [
          {
            $match: {
              isDeleted: false,
              $or: [
                { title: { $regex: query } },
                { status: { $regex: query } },
              ],
            },
          },
          { $sort: { [sortBy]: sort } },
          { $skip: (page - 1) * limit },
          { $limit: limit },
        ];
    }

    if (reqBody.module && reqBody.module == "department") {
      console.log("departments filter");
      result = await Department.aggregate(pipeline);
    } else if (reqBody.module && reqBody.module == "task") {
      result = await Task.aggregate(pipeline);
    } else if (reqBody.module && reqBody.module == "user") {
      result = await User.aggregate(pipeline);
    } else if (reqBody.module && reqBody.module == "role") {
      result = await Role.aggregate(pipeline);
    }
    return result;
  } catch (error) {
    throw new Error(
      `An error ocurred when filtering from ${reqBody.module}: ` + error.message
    );
  }
};

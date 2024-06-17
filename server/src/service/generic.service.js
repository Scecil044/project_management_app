import Department from "../models/Department.model.js";
import Role from "../models/Role.model.js";
import Task from "../models/Task.model.js";
import User from "../models/User.model.js";

export const genericFilter = async (reqBody, reqQuery) => {
  let result;
  const query = new RegExp(reqQuery.search, "i");
  const limit = reqQuery.limit ? parseInt(reqQuery.limit) : 20;
  const page = reqQuery.pages ? parseInt(reqQuery.pages) : 1;
  const sort = reqQuery.sortOrder ? parseInt(reqQuery.sortOrder) : -1;
  const sortBy = reqQuery.sortBy || "createdAt";

  let pipeline = [];
  switch (reqBody.module.toLowerCase()) {
    case "user":
      break;
  }

  if (reqBody.module && reqBody.module == "department") {
    result = await Department.aggregate(pipeline);
  } else if (reqBody.module && reqBody.module == "task") {
    result = await Task.aggregate(pipeline);
  } else if (reqBody.module && reqBody.module == "user") {
    result = await User.aggregate(pipeline);
  } else if (reqBody.module && reqBody.module == "role") {
    result = await Role.aggregate(pipeline);
  }
  return result;
};

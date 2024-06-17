import Role from "../models/Role.model.js";

export const findRoleById = async (id) => {
  return await Role.findOne({ _id: id, isDeleted: false });
};

export const findRoleByName = async (nameOfRole) => {
  const searchRegex = new RegExp(nameOfRole, "i");
  const pipleline = [
    {
      $match: {
        isDeleted: false,
        roleName: searchRegex,
      },
    },
  ];
  const result = await Role.aggregate(pipleline);
  return result[0];
};

export const createUserRole = async (reqBody, userId) => {
  console.log(reqBody);
  const isRole = await findRoleByName(reqBody.roleName);
  console.log(isRole);
  if (isRole) throw new Error("A similar role already exists in the DB!");
  const newRole = await Role.create({
    roleName: reqBody.roleName,
    roleId: reqBody.roleId,
    createdBy: userId,
    updatedBy: userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return newRole;
};

export const findSystemRoles = async () => {
  const roles = await Role.find({ isDeleted: false });
  return roles;
};

export const updateRoleDetails = async (reqBody, roleId) => {
  const isRole = await findRoleById(roleId);
  if (!isRole) throw new Error("could not find role with the provided id");
  const updates = Object.keys(reqBody);
  updates.forEach((update) => {
    isRole[update] = reqBody[update];
  });
  await isRole.save();
  return isRole;
};

export const discardRole = async (roleId, userId) => {
  const isRole = await findRoleById(roleId);
  if (!isRole) throw new Error("could not find role with the provided id");
  isRole.isDeleted = !isRole.isDeleted;
  isRole.updatedBy = userId;
  isRole.updatedAt = new Date();
  await isRole.save();
  return isRole;
};

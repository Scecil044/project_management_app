import jwt from "jsonwebtoken";

export const generateAuthToken = (userObject) => {
  return jwt.sign(
    {
      id: userObject._id,
      email: userObject.email,
      firstName: userObject.firstName,
      lastName: userObject.lastName,
    },
    process.env.JWT_SECRET
  );
};

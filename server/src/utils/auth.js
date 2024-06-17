import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(errorHandler(403, "No token, not authorized!"));
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Not authorized!"));
    req.user = user;
    next();
  });
};

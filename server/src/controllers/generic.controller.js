import { genericFilter } from "../service/generic.service.js";
import { errorHandler } from "../utils/error.js";

export const genericModelFilter = async (req, res, next) => {
  try {
    if (!req.body.module)
      return next(errorHandler(400, "provide the module field"));
    const result = await genericFilter(req.body, req.query);
    if (!result) return next(errorHandler(400, "could not complete filter"));
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

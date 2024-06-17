import { genericFilter } from "../service/generic.service.js";

export const genericModelFilter = async () => {
  const result = await genericFilter(req.body, req.query);
};

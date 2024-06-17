import Sequence from "../models/Sequence.model.js";

export const generateEmployeeNumber = async () => {
  const sequence = await Sequence.findOneAndUpdate(
    { name: "employeeNumber" },
    { $inc: { value: 1 } },
    { new: true, upsert: true, useFindAndModify: false }
  );

  const myString = "El";
  return `${myString}${sequence.value}`;
};

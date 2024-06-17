import mongoose from "mongoose";
import { errorHandler } from "../utils/error.js";
import Sequence from "../models/Sequence.model.js";

export const connectdb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `Mongo connection established on ${conn.connection.host}`.rainbow
        .underline
    );

    const initializeSequence = async () => {
      const sequence = await Sequence.findOne({ name: "employeeNumber" });
      if (!sequence) {
        const newSequence = new Sequence({ name: "employeeNumber", value: 0 });
        await newSequence.save();
      }
    };
    initializeSequence();
  } catch (error) {
    console.log(`Unable to connect to DB: ` + error.message);
  }
};

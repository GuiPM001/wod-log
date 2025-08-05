import { connectMongo } from "../db/mongodb";
import { Movements } from "../models/movements";
import { Movement } from "../types/Movement";

const getAll = async () => {
  await connectMongo();
  return await Movements.find().sort({ name: 1 }).exec();
};

const save = async (movement: Movement) => {
  await connectMongo();
  return await Movements.create(movement);
};

export const movementService = {
  getAll,
  save,
};

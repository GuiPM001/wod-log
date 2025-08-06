import { connectMongo } from "../db/mongodb";
import { Wods } from "../models/wods";
import { Wod } from "../types/Wod";

const saveWod = async (wod: Wod, userId: string) => {
  await connectMongo();
  return await Wods.create({ ...wod, userId });
};

const getAll = async (userId: string) => {
  await connectMongo();

  return await Wods.find({ userId: userId })
    .sort({ date: -1 })
    .exec();
};

export const wodService = {
  saveWod,
  getAll,
};

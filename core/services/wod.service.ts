import { connectMongo } from "../db/mongodb";
import { Wods } from "../models/wods";
import { Wod } from "../types/Wod";

const saveWod = async (wod: Wod, userId: string) => {
  await connectMongo();
  return await Wods.create({ ...wod, userId });
};

const getByMonth = async (date: string, userId: string) => {
  await connectMongo();

  const [year, month] = date.split("T")[0].split("-");

  const regex = new RegExp(`^${year}-${month}`);

  return await Wods.find({ date: { $regex: regex }, userId: userId })
    .sort({ date: -1 })
    .exec();
};

export const wodService = {
  saveWod,
  getByMonth,
};

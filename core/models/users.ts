import { model, models, Schema } from "mongoose";

const Userschema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
});

export const Users = models.Users || model("Users", Userschema);

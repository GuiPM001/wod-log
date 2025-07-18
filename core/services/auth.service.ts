import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { LoginResponse } from "@/core/types/LoginResponse";
import { LoginRequest } from "@/core/types/LoginRequest";
import { connectMongo } from "../db/mongodb";
import { Users } from "../models/users";
import { RegisterRequest } from "../types/RegisterRequest";

const login = async (request: LoginRequest): Promise<LoginResponse> => {
  const { email, password, rememberMe } = request;

  await connectMongo();

  const user = await Users.findOne({ email });
  if (!user) throw new Error("User not found");

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) throw new Error("Incorrect password");

  const token = jwt.sign(
    { _id: user._id, email: user.email, name: user.name },
    process.env.JWT_SECRET!,
    { expiresIn: rememberMe ? "365d" : "1h" }
  );

  return { token, user };
};

const register = async (request: RegisterRequest) => {
  const { name, email, password } = request;

  await connectMongo();

  const userRegistered = await Users.findOne({ email });
  if (userRegistered) throw new Error("Email already registered");

  const hashedPassword = await bcrypt.hash(password, 10);

  await Users.create({ name, email, password: hashedPassword });
};

const getUserTokenData = () => {
  
}

export const authService = {
  login,
  register,
};

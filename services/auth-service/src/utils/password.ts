import bcrypt from "bcrypt";
import { serverConfig } from "../config/serverConfig";

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(serverConfig.saltRounds);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};
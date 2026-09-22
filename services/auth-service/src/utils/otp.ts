import { redis } from "../config/redis";

export const generateOtp = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const storeOtp = async (
  email: string,
  otp: string
): Promise<void> => {
  const key = `otp:signup:${email}`;

  await redis.set(key, otp, "EX", 300);
};

export const verifyOtp = async (
  email: string,
  otp: string
): Promise<boolean> => {
  const key = `otp:signup:${email}`;

  const storedOtp = await redis.get(key);

  if (!storedOtp || storedOtp !== otp) {
    return false;
  }

  await redis.set(`signup:verified:${email}`, "true", "EX", 600);

  await redis.del(key);

  return true;
};

export const isEmailVerified = async (
  email: string
): Promise<boolean> => {
  const key = `signup:verified:${email}`;

  const verified = await redis.get(key);

  return verified === "true";
};
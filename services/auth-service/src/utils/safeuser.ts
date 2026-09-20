import { User } from "../generated/prisma/client";

export const getSafeUser = (user: User) => {
  const { password, ...safeUser } = user;

  return safeUser;
};
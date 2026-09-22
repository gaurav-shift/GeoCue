import { Prisma } from "../generated/prisma/client";
import { prisma } from "../config/prisma";

class UserRepository {
  async create(data: Prisma.UserCreateInput) {
    return prisma.user.create({
      data,
    });
  }

  async getByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async getById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async updatePassword(email: string, password: string) {
  return prisma.user.update({
    where: { email },
    data: { password },
  });
}

}

export default UserRepository;
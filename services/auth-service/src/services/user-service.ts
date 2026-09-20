import { StatusCodes } from "http-status-codes";
import { Prisma } from "../generated/prisma/client";
import UserRepository from "../repositories/user-repository";
import AppError from "../errors/AppError";
import { hashPassword } from "../utils/password";

class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(data: Prisma.UserCreateInput) {
    const existingUser = await this.userRepository.getByEmail(data.email);

    if (existingUser) {
      throw new AppError(
        `User already exists with email ${data.email}`,
        StatusCodes.CONFLICT,
        "USER_ALREADY_EXISTS"
      );
    }
    const hashedPassword = await hashPassword(data.password);
    return this.userRepository.create({ ...data, password: hashedPassword });
  }

  async getUserByEmail(email: string) {
    return this.userRepository.getByEmail(email);
  }

  async getById(id:string){
    return this.userRepository.getById(id);
  }
}

export default UserService;
import { StatusCodes } from "http-status-codes";
import UserService from "../services/user-service";
import { Request, Response, NextFunction } from "express";
import { successResponse } from "../utils/apiResponse";

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(StatusCodes.CREATED)
        .json(successResponse("User created successfully", user));
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
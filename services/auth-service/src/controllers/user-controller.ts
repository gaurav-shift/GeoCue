import { StatusCodes } from "http-status-codes";
import UserService from "../services/user-service";
import { Request, Response, NextFunction } from "express";
import { successResponse } from "../utils/apiResponse";
import { getSafeUser } from "../utils/safeuser";
import OtpService from "../services/otp-service";
import AppError from "../errors/AppError";

class UserController {
  private userService: UserService;
  private otpService: OtpService;

  constructor() {
    this.otpService = new OtpService();
    this.userService = new UserService();
  }

  async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = await this.userService.createUser(req.body);
      const safeUser = getSafeUser(user);
      return res.status(StatusCodes.CREATED).json(
        successResponse("User created successfully", safeUser)
      );
    } catch (error) {
      next(error);
    }
  }

  async requestSignupOtp(req: Request, res: Response, next: NextFunction) {
  try {
    const otp = await this.otpService.requestSignupOtp(req.body.email);

    return res.status(StatusCodes.OK).json(
      successResponse("OTP generated successfully", {
        email: req.body.email,
        otp,
      })
    );
  } catch (error) {
    next(error);
  }
}

  async verifySignupOtp(req: Request, res: Response, next: NextFunction) {
  try {
    const isValid = await this.otpService.verifySignupOtp(
      req.body.email,
      req.body.otp
    );

    if (!isValid) {
      throw new AppError(
        "Invalid or expired OTP",
        StatusCodes.BAD_REQUEST,
        "INVALID_OTP"
      );
    }

    return res.status(StatusCodes.OK).json(
      successResponse("OTP verified successfully", {
        email: req.body.email,
        verified: true,
      })
    );
  } catch (error) {
    next(error);
  }
}

async setPassword(req: Request, res: Response, next: NextFunction) {
  try {
    const isVerified = await this.otpService.checkEmailVerified(
      req.body.email
    );

    if (!isVerified) {
      throw new AppError(
        "Email verification required",
        StatusCodes.BAD_REQUEST,
        "EMAIL_NOT_VERIFIED"
      );
    }

    const user = await this.userService.createUserAfterVerification(
      req.body.name,
      req.body.email,
      req.body.password
    );

    const safeUser = getSafeUser(user);

    return res.status(StatusCodes.CREATED).json(
      successResponse("User created successfully", safeUser)
    );
  } catch (error) {
    next(error);
  }
}
}

export default UserController;
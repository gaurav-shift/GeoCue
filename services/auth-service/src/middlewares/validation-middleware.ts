import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import AppError from "../errors/AppError";

const validationMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new AppError(
      "Validation failed",
      StatusCodes.BAD_REQUEST,
      "VALIDATION_ERROR",
      errors.array()
    );
  }

  next();
};

export default validationMiddleware;
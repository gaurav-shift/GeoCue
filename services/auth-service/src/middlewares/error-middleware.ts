import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import AppError from "../errors/AppError";
import { ApiResponse } from "../utils/apiResponse";

const errorMiddleware = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log("Error middleware hit");
  console.log(err);

  if (err instanceof AppError) {
    const response: ApiResponse<null> = {
      success: false,
      message: err.message,
      data: null,
      error: {
        code: err.code,
        details: err.details,
      },
    };

    return res.status(err.statusCode).json(response);
  }

  const response: ApiResponse<null> = {
    success: false,
    message: "Internal server error",
    data: null,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      details: null,
    },
  };

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
};

export default errorMiddleware;
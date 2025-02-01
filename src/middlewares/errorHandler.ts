import { Request, Response, NextFunction } from "express";
import { BaseException } from "../config/exceptions";

// Global error handler middleware
function globalErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err); 
  if (err instanceof BaseException) {
  
    return res.status(err.statusCode).json({
      message: err.message,
      resource: err.resource,
      type: err.constructor.name, 
    });
  }

  return res.status(500).json({
    message: "Internal Server Error",
    type: "InternalServerError",
    resource: "N/A",
  });
}

export default globalErrorHandler;

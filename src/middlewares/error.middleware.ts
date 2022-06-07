import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';

function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {

  console.log("Hihihihihi")
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  return response
    .status(status)
    .send({
      success: false,
      message,
      status,
    });
}

export default errorMiddleware;

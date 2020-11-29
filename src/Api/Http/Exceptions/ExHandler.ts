import ErrorWithCode from "@Application/Common/Exceptions/ErrorWithCode";
import { NextFunction, Request, Response } from "express";

function exceptionHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ErrorWithCode) {
    return res
      .status((err as ErrorWithCode).code)
      .send((err as ErrorWithCode).toJson());
  }
  console.log(err);
  return res.status(500).send({ message: "Bad Request" });
}

export default exceptionHandler;

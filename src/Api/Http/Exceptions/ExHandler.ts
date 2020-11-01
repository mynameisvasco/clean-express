import AbstractEx from "@Application/Common/Models/AbstractEx";
import { NextFunction, Request, Response } from "express";

export default function exceptionHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AbstractEx) {
    return res
      .status((err as AbstractEx).code)
      .send((err as AbstractEx).toJson());
  }
  return res.status(500).send({ message: "Bad Request" });
}

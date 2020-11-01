import { NextFunction, Request, Response } from "express";
import IncorrectSecretEx from "../Exceptions/IncorrectSecretEx";
import AbstractMiddleware from "../Models/AbstractMiddleware";

export default class ExampleMiddleware extends AbstractMiddleware {
  protected async _handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    if (req.body.secret !== "Aveiro" && req.query.secret !== "Aveiro") {
      throw new IncorrectSecretEx(this);
    }
    return next();
  }
}

import { boundMethod } from "autobind-decorator";
import { NextFunction, Request, Response } from "express";

abstract class Middleware {
  protected constructor() {}

  @boundMethod
  public async handle(req: Request, res: Response, next: NextFunction) {
    return this._handle(req, res, next).catch((err) => next(err));
  }

  protected abstract _handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
}

export default Middleware;

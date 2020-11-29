import { NextFunction, Request, Response } from "express";

abstract class Action {
  public async perform(req: Request, res: Response, next: NextFunction) {
    try {
      await this.validate(req);
      await this.handle(req, res);
    } catch (err) {
      next(err);
    }
  }

  protected abstract handle(req: Request, res: Response): Promise<Response>;

  protected abstract validate(request: Request): Promise<void>;
}

export default Action;

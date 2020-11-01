import { NextFunction, Request, Response } from "express";

export default abstract class AbstractAction {
  public async perform(req: Request, res: Response, next: NextFunction) {
    this.validate(req);
    this.handle(req, res).catch((err) => next(err));
  }

  protected abstract handle(req: Request, res: Response): Promise<Response>;

  protected abstract validate(request: Request): void;
}

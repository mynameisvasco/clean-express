import IDatabaseService from "@Application/Common/Interfaces/IDatabaseService";
import Action from "@Application/Common/Models/Action";
import { Request, Response } from "express";
import { autoInjectable, inject } from "tsyringe";

@autoInjectable()
class GetDetailsAction extends Action {
  private readonly _db: IDatabaseService;
  public constructor(@inject("IDatabaseService") db?: IDatabaseService) {
    super();
    this._db = db;
  }

  public async handle(req: Request, res: Response) {
    const user = await this._db.users().findOneOrFail({ id: req.user.id });
    return res.send(user);
  }

  public async validate(req: Request) {}
}

export default GetDetailsAction;

import ValidationEx from "@Application/Common/Exceptions/ValidationEx";
import IDatabaseService from "@Application/Common/Interfaces/IDatabaseService";
import Action from "@Application/Common/Models/Action";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { autoInjectable, inject } from "tsyringe";

interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
}

@autoInjectable()
class RegisterAction extends Action {
  private readonly _db: IDatabaseService;

  public constructor(@inject("IDatabaseService") db?: IDatabaseService) {
    super();
    this._db = db;
  }

  public async handle(req: Request, res: Response) {
    const body: RegisterRequestBody = req.body;

    this._db.users().save({
      name: body.name,
      email: body.email,
      password: await bcrypt.hash(body.password, 10),
    });

    return res.send({
      message: "Account created with success!",
    });
  }

  public async validate(req: Request) {
    const body: RegisterRequestBody = req.body;
    if (!body.name) {
      throw new ValidationEx(this, "name", "cannot be empty.");
    }
    if (!body.email) {
      throw new ValidationEx(this, "email", "cannot be empty.");
    }
    if ((await this._db.users().count({ email: body.email })) !== 0) {
      throw new ValidationEx(this, "email", "is already in use");
    }
    if (!body.password) {
      throw new ValidationEx(this, "password", "cannot be empty.");
    }
  }
}

export default RegisterAction;

import ValidationEx from "@Application/Common/Exceptions/ValidationEx";
import IDatabaseService from "@Application/Common/Interfaces/IDatabaseService";
import Action from "@Application/Common/Models/Action";
import Configurator from "@Application/Common/Models/Configurator";
import AuthUser from "@Domain/Models/AuthUser";
import { Request, Response } from "express";
import Jwt, { Algorithm } from "jsonwebtoken";
import { autoInjectable, inject } from "tsyringe";

interface LoginRequestBody {
  email: string;
  password: string;
}

@autoInjectable()
class LoginAction extends Action {
  private readonly _db: IDatabaseService;
  private readonly _config: Configurator;

  public constructor(
    @inject("IDatabaseService") db?: IDatabaseService,
    config?: Configurator
  ) {
    super();
    this._db = db;
    this._config = config;
  }

  public async handle(req: Request, res: Response) {
    const body: LoginRequestBody = req.body;
    const user = await this._db.users().findOneOrFail({
      email: body.email,
    });
    const authUser = new AuthUser(user);
    return res.send({
      token: Jwt.sign(
        authUser.toJson(),
        this._config.get<string>("jwt.secret"),
        {
          expiresIn: this._config.get<string>("jwt.expiresIn"),
          algorithm: this._config.get<Algorithm>("jwt.algorithm"),
        }
      ),
    });
  }

  public async validate(req: Request) {
    const body: LoginRequestBody = req.body;
    if (!body.email) {
      throw new ValidationEx(this, "email", "cannot be empty.");
    }
    if (!body.password) {
      throw new ValidationEx(this, "password", "cannot be empty.");
    }
  }
}

export default LoginAction;

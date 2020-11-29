import Middleware from "@Api/Http/Middleware/Middleware";
import ErrorWithCode from "@Application/Common/Exceptions/ErrorWithCode";
import Configurator from "@Application/Common/Models/Configurator";
import AuthUser from "@Domain/Models/AuthUser";
import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { autoInjectable } from "tsyringe";

@autoInjectable()
class AuthMiddleware extends Middleware {
  private readonly _config: Configurator;

  public constructor(config?: Configurator) {
    super();
    this._config = config;
  }

  protected async _handle(req: Request, res: Response, next: NextFunction) {
    const token = req.header("Authorization");
    if (!token) {
      throw new ErrorWithCode("You must be authenticated.", 401);
    }
    try {
      const user = Jwt.verify(token, this._config.get<string>("jwt.secret"));
      req.user = user as AuthUser;
    } catch (e) {
      throw new ErrorWithCode("The provided credentials are incorrect.", 400);
    }
    next();
  }
}

export default AuthMiddleware;

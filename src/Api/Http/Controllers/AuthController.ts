import LoginAction from "@Application/Auth/LoginAction";
import RegisterAction from "@Application/Auth/RegisterAction";
import { Controller, Post } from "@Lib/ExpressDecorators";
import { NextFunction, Request, Response } from "express";

@Controller("auth")
class AuthController {
  @Post("login")
  public async login(req: Request, res: Response, next: NextFunction) {
    return await new LoginAction().perform(req, res, next);
  }

  @Post("register")
  public async register(req: Request, res: Response, next: NextFunction) {
    return await new RegisterAction().perform(req, res, next);
  }
}

export default AuthController;

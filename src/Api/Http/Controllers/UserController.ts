import AuthMiddleware from "@Api/Http/Middleware/AuthMiddleware";
import GetDetailsAction from "@Application/User/GetDetailsAction";
import { Controller, Get } from "@Lib/ExpressDecorators";
import { NextFunction, Request, Response } from "express";

@Controller("user", [AuthMiddleware])
class UserController {
  @Get("details")
  public async details(req: Request, res: Response, next: NextFunction) {
    return await new GetDetailsAction().perform(req, res, next);
  }
}

export default UserController;

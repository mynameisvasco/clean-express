import AuthUser from "@Domain/Models/AuthUser";
import "express";

declare module "express" {
  interface Request {
    user?: AuthUser;
  }
}

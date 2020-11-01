import GetProductAction from "@Application/Products/Actions/GetProductAction";
import { boundMethod } from "autobind-decorator";
import { NextFunction, Request, Response, Router } from "express";
import { autoInjectable } from "tsyringe";
import Http from "../Http";
import AbstractController from "../Models/AbstractController";

@autoInjectable()
export default class ProductsController extends AbstractController {
  protected readonly _getProductAction: GetProductAction;

  public constructor(http: Http, getProductAction: GetProductAction) {
    super(http);
    this._getProductAction = getProductAction;
  }

  public register() {
    const router = Router();
    router.get("", this.show);
    this._http.app.use("/api/products", router);
  }

  @boundMethod
  public async show(req: Request, res: Response, next: NextFunction) {
    return await this._getProductAction.perform(req, res, next);
  }
}

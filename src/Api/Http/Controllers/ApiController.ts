import { Router } from "express";
import { autoInjectable } from "tsyringe";
import Http from "../Http";
import ExampleMiddleware from "../Middleware/ExampleMiddleware";
import AbstractController from "../Models/AbstractController";

@autoInjectable()
export default class ApiController extends AbstractController {
  protected readonly _http: Http;
  protected readonly _exampleMiddleware: ExampleMiddleware;

  public constructor(http: Http, exampleMiddleware: ExampleMiddleware) {
    super(http);
    this._exampleMiddleware = exampleMiddleware;
  }

  public register(): void {
    const router = Router();
    router.use(this._exampleMiddleware.handle);
    this._http.app.use("/api", router);
  }
}

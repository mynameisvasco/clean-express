import Configurator from "@Application/Configurator";
import express, { Express } from "express";
import { autoInjectable } from "tsyringe";
import exceptionHandler from "./Exceptions/ExHandler";

@autoInjectable()
export default class Http {
  protected readonly _configurator?: Configurator;
  private readonly _app: Express;

  constructor(configurator: Configurator) {
    this._app = express();
    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: true }));
    this._configurator = configurator;
  }

  public register() {}

  public init() {
    this._app.use(exceptionHandler);
    this._app.listen(this._configurator.get("port") ?? 8080, () => {
      console.log("🔥 Server Running");
    });
  }

  public get app() {
    return this._app;
  }
}

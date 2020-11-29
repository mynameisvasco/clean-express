import exceptionHandler from "@Api/Http/Exceptions/ExHandler";
import Configurator from "@Application/Common/Models/Configurator";
import express, { Express, Router } from "express";
import { autoInjectable } from "tsyringe";

@autoInjectable()
class Http {
  private readonly _app: Express;
  private readonly _configurator: Configurator;

  constructor(configurator: Configurator) {
    this._app = express();
    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: true }));
    this._configurator = configurator;
  }

  public init() {
    this._app.use(exceptionHandler);
    this._app.listen(this._configurator.get("port") ?? 8080, () => {
      console.log("🔥 Server Running");
    });
  }

  public addRouter(router: Router) {
    this._app.use(router);
  }
}

export default Http;

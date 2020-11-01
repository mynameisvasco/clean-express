import Configurator from "@Application/Configurator";
import { autoInjectable } from "tsyringe";
import { Connection, createConnection } from "typeorm";

@autoInjectable()
export default class DatabaseService {
  protected readonly _configurator: Configurator;
  private _connection: Connection;

  public constructor(configurator: Configurator) {
    this._configurator = configurator;
  }

  public async init() {
    this._connection = await createConnection(this._configurator.get("db"));
  }
}

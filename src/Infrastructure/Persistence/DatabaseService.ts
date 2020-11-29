import IDatabaseService from "@Application/Common/Interfaces/IDatabaseService";
import Configurator from "@Application/Common/Models/Configurator";
import User from "@Domain/Entities/User";
import { autoInjectable } from "tsyringe";
import { Connection, createConnection } from "typeorm";

@autoInjectable()
class DatabaseService implements IDatabaseService {
  protected readonly _configurator: Configurator;
  private _connection: Connection;

  public constructor(configurator: Configurator) {
    this._configurator = configurator;
  }

  public async init() {
    this._connection = await createConnection();
  }

  public users() {
    return this._connection.getRepository(User);
  }
}

export default DatabaseService;

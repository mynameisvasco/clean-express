import { readFileSync } from "fs";
import "reflect-metadata";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export default class Configurator {
  private _config: any = {};

  public constructor() {
    const file = readFileSync("config.json", "utf-8");
    this._config = JSON.parse(file);
  }

  public get(key: string) {
    return this._config[key];
  }
}

import { readFileSync } from "fs";
import "reflect-metadata";

class Configurator {
  private _config: any = {};

  public constructor() {
    const file = readFileSync("config.json", "utf-8");
    this._config = JSON.parse(file);
  }

  public get<T>(key: string) {
    let value = this._config;
    key.split(".").forEach((k) => {
      value = value[k];
    });
    return value as T;
  }
}

export default Configurator;

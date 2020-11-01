import IDatabaseService from "@Application/Common/Interfaces/IDatabaseService";
import { container } from "tsyringe";
import DatabaseService from "./Persistence/DatabaseService";

export function register() {
  container.registerSingleton<IDatabaseService>(
    "DatabaseService",
    DatabaseService
  );
}

export function init() {
  container.resolve<IDatabaseService>("DatabaseService").init();
}

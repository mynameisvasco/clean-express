import IDatabaseService from "@Application/Common/Interfaces/IDatabaseService";
import DatabaseService from "@Infrastructure/Persistence/DatabaseService";
import { container } from "tsyringe";

function register() {
  container.registerSingleton<IDatabaseService>(
    "IDatabaseService",
    DatabaseService
  );
}

function init() {
  container.resolve<IDatabaseService>("IDatabaseService").init();
}

export { register, init };

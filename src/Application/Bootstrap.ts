import Configurator from "@Application/Common/Models/Configurator";
import { container } from "tsyringe";

function register() {
  container.registerSingleton(Configurator);
}

function init() {}

export { register, init };

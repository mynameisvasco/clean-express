import "reflect-metadata";
import { init as initApi, register as registerApi } from "@Api/Bootstrap";
import {
  init as initApplication,
  register as registerApplication,
} from "@Application/Bootstrap";
import {
  init as initInfrastrucutre,
  register as registerInfrastructure,
} from "@Infrastructure/Bootstrap";

registerApi();
registerApplication();
registerInfrastructure();

initApi();
initApplication();
initInfrastrucutre();

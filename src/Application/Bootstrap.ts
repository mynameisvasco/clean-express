import Configurator from "@Application/Configurator";
import { glob } from "glob";
import { container } from "tsyringe";

function resolveActions() {
  const actions: any[] = [];
  const actionPaths = glob.sync("./src/Application/**/Actions/*.ts");
  actionPaths.forEach((a) => {
    const actionPath = a
      .replace(".ts", "")
      .replace("./src/", "")
      .replace("Application", "@Application");
    actions.push(require(actionPath).default);
  });
  return actions;
}

export function register() {
  const actions = resolveActions();
  actions.forEach((a) => container.registerSingleton(a));
  container.registerSingleton(Configurator);
}

export function init() {}

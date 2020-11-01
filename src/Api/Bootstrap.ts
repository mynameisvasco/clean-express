import { glob } from "glob";
import { container } from "tsyringe";
import Http from "./Http/Http";
import AbstractController from "./Http/Models/AbstractController";

function resolveControllers() {
  const controllers: any[] = [];
  const controllerPaths = glob.sync("./src/Api/Http/Controllers/*.ts");
  controllerPaths.forEach((p) => {
    const controllerPath = p
      .replace(".ts", "")
      .replace("./src/", "")
      .replace("Api", "@Api");
    controllers.push(require(controllerPath).default);
  });
  return controllers;
}

function resolveMiddlewares() {
  const middlewares: any[] = [];
  const middlewarePaths = glob.sync("./src/Api/Http/Middleware/*.ts");
  middlewarePaths.forEach((m) => {
    const middlewarePath = m
      .replace(".ts", "")
      .replace("./src/", "")
      .replace("Api", "@Api");
    middlewares.push(require(middlewarePath).default);
  });
  return middlewares;
}

export function register() {
  const controllers = resolveControllers();
  const middlewares = resolveMiddlewares();
  container.registerSingleton(Http);
  middlewares.forEach((m) => container.registerSingleton(m));
  controllers.forEach((c) => {
    container.registerSingleton(c);
    (container.resolve(c) as AbstractController).register();
  });
}

export function init() {
  container.resolve(Http).init();
}

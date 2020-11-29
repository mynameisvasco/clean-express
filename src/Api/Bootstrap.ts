import Http from "@Api/Http/Http";
import { getControllerInfo } from "@Lib/ExpressDecorators";
import { glob } from "glob";
import { container } from "tsyringe";

function resolveControllers() {
  const controllers: any[] = [];
  const controllerPaths = glob.sync("./src/Api/Http/Controllers/*.ts");
  controllerPaths.forEach((p) => {
    const controllerPath = p
      .replace(".ts", "")
      .replace("./src/", "")
      .replace("Api", "@Api");
    const controller = require(controllerPath).default;
    if (controller.name !== "Controller") {
      controllers.push(controller);
    }
  });
  return controllers;
}

function register() {
  const controllers = resolveControllers();
  container.registerSingleton(Http);
  controllers.forEach((c) => container.registerSingleton("Controller", c));
}

function init() {
  const http = container.resolve(Http);
  container.resolveAll<any>("Controller").forEach((c) => {
    const controller = getControllerInfo(c);
    controller.middleware.forEach((m) => {
      controller.router.use(m.handle);
    });
    for (var route of controller.routes) {
      route.middleware.forEach((m) => controller.router.use(m.handle));
      (controller.router as any)[route.method](
        `/${controller.baseUrl}/${route.url}`,
        route.handler
      );
    }
    http.addRouter(controller.router);
  });
  http.init();
}

export { register, init };

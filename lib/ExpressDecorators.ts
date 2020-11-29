import Middleware from "@Api/Http/Middleware/Middleware";
import { Router } from "express";

export type ControllerInfo = {
  router: Router;
  baseUrl: string;
  middleware?: Middleware[];
  routes: RouteInfo[];
};

export type RouteInfo = {
  url: string;
  method: string;
  middleware?: Middleware[];
  handler: Function;
};

export function Controller(baseUrl: string, middleware?: Function[]) {
  return (constructor: Function) => {
    Reflect.defineMetadata("controller:router", Router(), constructor);
    Reflect.defineMetadata("controller:baseUrl", baseUrl, constructor);
    Reflect.defineMetadata(
      "controller:middleware",
      middleware?.map((m) => Reflect.construct(m, [])) ?? [],
      constructor
    );
  };
}

export function Get(url: string, middleware?: Function[]) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    defineRouteInfo(url, "get", descriptor.value, target, middleware);
  };
}

export function Post(url: string, middleware?: Function[]) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    defineRouteInfo(url, "post", descriptor.value, target, middleware);
  };
}

export function Put(url: string, middleware?: Function[]) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    defineRouteInfo(url, "put", descriptor.value, target, middleware);
  };
}

export function Delete(url: string, middleware?: Function[]) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    defineRouteInfo(url, "delete", descriptor.value, target, middleware);
  };
}

export function getControllerInfo(controller: Function) {
  const router = Reflect.getMetadata(
    "controller:router",
    controller.constructor
  ) as Router;
  const baseUrl = Reflect.getMetadata(
    "controller:baseUrl",
    controller.constructor
  ) as string;
  const middleware = Reflect.getMetadata(
    "controller:middleware",
    controller.constructor
  ) as Middleware[];
  const routes = Reflect.getMetadata(
    "controller:routes",
    controller
  ) as RouteInfo[];

  return {
    router,
    baseUrl,
    middleware,
    routes,
  } as ControllerInfo;
}

function defineRouteInfo(
  url: string,
  method: string,
  handler: Function,
  target: any,
  middleware?: Function[]
) {
  const routeInfo: RouteInfo = {
    url,
    method,
    middleware: middleware
      ? middleware.map((m) => Reflect.construct(m, []))
      : [],
    handler,
  };
  let existingRoutes = Reflect.getMetadata("controller:routes", target);
  if (!existingRoutes) {
    Reflect.defineMetadata("controller:routes", [], target);
  }
  existingRoutes = Reflect.getMetadata("controller:routes", target);
  existingRoutes.push(routeInfo);
  Reflect.defineMetadata("controller:routes", existingRoutes, target);
}

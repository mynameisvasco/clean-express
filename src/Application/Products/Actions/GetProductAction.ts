import MyCustomEx from "@Application/Common/Exceptions/MyCustomEx";
import AbstractAction from "@Application/Common/Models/AbstractAction";
import { Request, Response } from "express";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export default class GetProductAction extends AbstractAction {
  protected async handle(req: Request, res: Response): Promise<Response> {
    //throw new MyCustomEx(this);
    return res.send({ name: "Alface", price: 20 });
  }

  protected validate(request: Request) {}
}

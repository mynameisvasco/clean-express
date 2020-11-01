import AbstractEx from "../Models/AbstractEx";

export default class MyCustomEx extends AbstractEx {
  public constructor(raiser: object) {
    super("This is an exception", 404, raiser);
  }
}

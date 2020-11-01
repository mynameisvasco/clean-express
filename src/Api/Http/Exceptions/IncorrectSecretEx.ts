import AbstractEx from "@Application/Common/Models/AbstractEx";

export default class IncorrectSecretEx extends AbstractEx {
  public constructor(raiser: object) {
    super("Missing or incorrect secret!", 400, raiser);
  }
}

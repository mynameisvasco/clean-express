import ErrorWithCode from "@Application/Common/Exceptions/ErrorWithCode";

class ValidationEx extends ErrorWithCode {
  public constructor(raiser: object, field: string, reason: string) {
    super(`Error validating your request, ${field} ${reason}`, 400, raiser);
  }
}

export default ValidationEx;

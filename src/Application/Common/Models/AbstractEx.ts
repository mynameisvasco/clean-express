export default abstract class AbstractEx extends Error {
  private _code: number;
  private _raiser: object;

  public constructor(message: string, code: number, raiser: object) {
    super(message);
    this._code = code;
    this._raiser = raiser;
  }

  public get code(): number {
    return this._code;
  }

  public get raiser(): object {
    return this._raiser;
  }

  public toJson() {
    return {
      message: this.message,
      code: this.code,
      stack: this.stack,
    };
  }
}

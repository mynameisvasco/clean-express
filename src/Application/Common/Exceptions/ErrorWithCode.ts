class ErrorWithCode extends Error {
  private _code: number;

  public constructor(message: string, code: number) {
    super(message);
    this._code = code;
  }

  public get code(): number {
    return this._code;
  }

  public toJson() {
    return {
      message: this.message,
      code: this.code,
      stack: this.stack,
    };
  }
}

export default ErrorWithCode;

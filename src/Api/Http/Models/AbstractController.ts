import Http from "../Http";

export default abstract class AbstractController {
  protected readonly _http: Http;

  protected constructor(http: Http) {
    this._http = http;
  }

  public abstract register(): void;
}

export class NotImplementedError extends Error {
  constructor() {
    super("This combination of parameters is not supported yet");
    this.name = "NotImplementedError";
  }
}

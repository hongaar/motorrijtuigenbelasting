export class InvalidArgument extends Error {
  constructor(message: string) {
    super();
    this.message = `Invalid argument (${message})`;
    this.name = "InvalidArgument";
  }
}

export class NotImplementedError extends Error {
  constructor() {
    super();
    this.message = "This combination of parameters is not supported yet";
    this.name = "NotImplementedError";
  }
}

export class InvalidArgument extends Error {
  constructor(message: string) {
    super();
    this.message = `Invalid argument (${message})`;
    this.name = "InvalidArgument";
  }
}

export class NotImplementedError extends Error {
  constructor(message?: string) {
    super();
    this.message = "This combination of parameters is not supported yet";

    if (message) {
      this.message += ` (${message})`;
    }

    this.name = "NotImplementedError";
  }
}

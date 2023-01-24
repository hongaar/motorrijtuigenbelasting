export class NotImplementedError extends Error {
  constructor() {
    super();
    this.message = "Deze combinatie van parameters wordt nog niet ondersteund";
    this.name = "NotImplementedError";
  }
}

export class InvalidParameters extends Error {
  constructor(message: string) {
    super();
    this.message = `Ongeldige parameter ontvangen (${message})`;
    this.name = "InvalidParameters";
  }
}

export class InvalidRdwData extends Error {
  constructor() {
    super();
    this.message = "Ongeldige RDW data ontvangen";
    this.name = "InvalidRdwData";
  }
}

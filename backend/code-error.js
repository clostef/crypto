export class CodeError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.status = statusCode;
  }
}

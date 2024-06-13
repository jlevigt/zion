class UnauthorizedError extends Error {
  constructor(message) {
    super(message);

    this.type = "Unauthorized";
    this.code = 401;
  }
}

export default UnauthorizedError;

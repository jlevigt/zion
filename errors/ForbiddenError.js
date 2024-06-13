class ForbiddenError extends Error {
  constructor(message) {
    super(message);

    this.type = "Forbidden";
    this.code = 403;
  }
}

export default ForbiddenError;

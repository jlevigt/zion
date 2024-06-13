import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

import BadRequestError from "errors/BadRequestError.js";
import UnauthorizedError from "errors/UnauthorizedError.js";
import ForbiddenError from "./ForbiddenError";

export default function errorHandler(err, response) {
  console.error(err);

  if (err instanceof BadRequestError || err instanceof UnauthorizedError || err instanceof ForbiddenError) {
    return response.status(err.code).json({
      type: err.type,
      code: err.code,
      message: err.message,
    });
  }

  if (err instanceof JsonWebTokenError || err instanceof TokenExpiredError) {
    return response.status(401).json({
      type: "JsonWebToken Error",
      code: 401,
      message: err.message,
    });
  }

  err = {
    code: 500,
    type: "Internal Error",
    message: err.message,
  };

  return response.status(500).json(err);
}

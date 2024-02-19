class CustomError extends Error {
  //CUSTOM ERROR CONSTRUCTOR
  constructor(message, statusCode) {
    super(message);
    this.message = message;
    this.status = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;

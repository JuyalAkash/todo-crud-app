import CustomError from "../utils/customError.js";

const errorHandler = (err, req, res, next) => {
  console.log("errorHandler err: ", err);
  console.log("errorHandler message: ", err.message);
  let error = { ...err };
  error.message = err.message;

  if (err.code === 11000) {
    const message = `Duplicate field value enter`;
    error = new CustomError(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Interal Server Error",
  });
};

export default errorHandler;

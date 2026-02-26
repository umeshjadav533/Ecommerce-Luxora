class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    // Duplicate key error (MongoDB)
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered.`;
        err = new ErrorHandler(message, 400);
    }

    // JWT error (Invalid Token)
    if (err.name === "JsonWebTokenError") {
        const message = "JSON Web Token is invalid. Try again!";
        err = new ErrorHandler(message, 400);
    }

    // JWT error (Expired Token)
    if (err.name === "TokenExpiredError") {
        const message = "JSON Web Token has expired. Try again!";
        err = new ErrorHandler(message, 400);
    }

    // Mongoose Cast Error (Invalid ObjectId)
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // Validation errors (Mongoose)
    const errorMessage = err.errors
        ? Object.values(err.errors)
              .map((value) => value.message)
              .join(", ")
        : err.message;

    return res.status(err.statusCode).json({
        success: false,
        message: errorMessage
    });
};

export default ErrorHandler;
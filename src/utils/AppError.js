// creating a custom error class 
// 'fail' for 4xx errors and 'error' for 5xx errors
// isOperational: marks this as an expected error and not a bug 

class AppError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;
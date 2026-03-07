import AppError from '../utils/AppError.js';

// Handles ALL errors in one place
// Shows detailed errors in development
// Hides sensitive details in production
// Distinguishes between operational and programming errors

// Handle MongoDB duplicate key error
const handleDuplicateFieldDB = (err) => {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    const message = `${field}  '${value}' already exists. Please use another value.`;
    return new AppError(message, 409);
};

// Handle MongoDB validation error
const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
};

// Handle JWT errors 
const handleJWTError = () => 
    new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = () => 
    new AppError('Your token has expired! Please log in again.', 401);

const errorHandler = ( err, req, res, next) => {
    // set defaults
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // It creates a copy of the error object because we don't want to modify the original error object.
    let error = { ...err };
    error.message = err.message;

    if(err.code === 11000) error = handleDuplicateFieldDB(err);
    if(err.name === 'ValidationError') error = handleValidationErrorDB(err);
    if (err.name === 'JsonWebTokenError') error = handleJWTError();
    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();


    // Development: send full error details
    if(process.env.NODE_ENV === 'development') {
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });

    }
    // Production: Send minimal error info
    else {
        // Operational, trusted error: send message to client
        if (err.isOperational) {
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message
            });
        }
        // Programming or unknown error: don't leak details
        else {
            console.log('ERROR 💥', err);
            res.status(500).json({
                status: 'error',
                message: 'Something went wrong!'
            });
        }
    }
};

export default errorHandler;
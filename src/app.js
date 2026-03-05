// setting up, initializing, and defining the behavior of an Express application instance before it begins handling server requests.

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoute from './routes/auth.routes.js';
import postRoutes from './routes/post.routes.js';
import errorHandler from './middleware/errorHandler.js';
import AppError from './utils/AppError.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/auth", authRoute); // If someone knocks on the /auth door, show them the authRoute router.
app.use("/posts", postRoutes); // If someone knocks on the /posts door, show them the postRoutes router.

app.get('/', (req,res) => {
    res.json({
        message: "Welcome to the Blog API"
    });
});

// Handle Undefined Routes (404) 
// This catches all requests to routes that doesn't exist
// Must come after all other defined routes, otherwise it would catch everything and prevent other routes from working

app.use((req,res,next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handling Middleware
// This must be the last middleware, after all routes and other middleware, to catch any errors that occur in the app
app.use(errorHandler);

export default app;
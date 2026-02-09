// setting up, initializing, and defining the behavior of an Express application instance before it begins handling server requests.

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoute from './routes/auth.routes.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/auth", authRoute); // If someone knocks on the /auth door, show them the authRoute router.

app.get('/', (req,res) => {
    res.json({
        message: "Welcome to the Blog API"
    });
});

export default app;
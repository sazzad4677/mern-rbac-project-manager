import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './env';
import { connectDB } from './config/db';
import { AppError } from './utils/AppError';
import { globalErrorHandler } from './middlewares/error.middleware';

import { authRouter } from './routes/auth.routes';
import { userRouter } from './routes/user.routes';
import { projectRouter } from './routes/project.routes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Hello from Strict Node.js Backend!' });
});

// Routes
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/projects', projectRouter);

// Handle unhandled routes
app.use((req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler
app.use(globalErrorHandler);

const startServer = async () => {
    try {
        await connectDB();
        app.listen(env.PORT, () => {
            console.log(`Server is running on port ${env.PORT} in ${env.NODE_ENV} mode`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { env } from './env';
import { connectDB } from './config/db';
import { AppError } from './utils/AppError';
import { globalErrorHandler } from './middlewares/error.middleware';
import router from './routes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Strict Node.js Backend!' });
});

// Mount the Main Router
app.use(router);

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
      // eslint-disable-next-line no-console
      console.log(
        `Server is running on port ${env.PORT} in ${env.NODE_ENV} mode`,
      );
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

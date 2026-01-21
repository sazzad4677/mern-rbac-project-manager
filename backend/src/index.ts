import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './env';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Hello from Strict Node.js Backend!' });
});

app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT} in ${env.NODE_ENV} mode`);
});

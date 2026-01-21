import { z } from 'zod';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const envSchema = z.object({
    PORT: z.string().default('3000'),
    MONGO_URI: z.url(),
    JWT_SECRET: z.string().min(10),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

const envParse = envSchema.safeParse(process.env);

if (!envParse.success) {
    console.error('❌ Invalid environment variables:', z.formatError(envParse.error));
    process.exit(1);
}

export const env = envParse.data;

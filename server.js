import express from 'express';
import { dbConnection } from './startup/dbConnection.js';
import { redisConnection } from './startup/redisConnection.js';
import { expressStartup } from './startup/expressStartup.js';
import config from './config/index.js';

// Create the express app
const app = express();

const startServer = async () => {
    await dbConnection();
    await redisConnection();
    await expressStartup(app);
};

// Export the handler to make it work with Vercel
startServer().catch((error) => {
    console.error("Failed to start the server:", error);
});

export default app; // Vercel expects the export for serverless function

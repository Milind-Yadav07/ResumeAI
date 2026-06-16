import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import morgan from 'morgan';
import logger from './src/utils/logger.js';
import { env } from './src/config/env.js';
import { connectDB } from './src/config/db.js';
import { ensureDbConnected } from './src/middleware/db.middleware.js';
import { errorHandler } from './src/middleware/error.middleware.js';
import authRoutes from './src/routes/auth.routes.js';
import resumeRoutes from './src/routes/resume.routes.js';
import aiRoutes from './src/modules/ai/ai.routes.js';
import { authLimiter, aiLimiter, generalLimiter } from './src/middleware/rateLimiter.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure required directories exist on startup
const ensureDir = async (dir: string) => {
  await fs.promises.mkdir(dir, { recursive: true });
};

await Promise.all([
  ensureDir(path.join(__dirname, 'uploads')),
  ensureDir(path.join(__dirname, 'logs')),
]);

const app = express();
const PORT = env.PORT;

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 1. Connect to Database
connectDB();

// 2. Global Middleware
app.use(helmet());
app.use(cors({
  origin: env.CLIENT_URL,
  credentials: true
}));
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Request sanitization against NoSQL injection
app.use(mongoSanitize());

// HTTP request logging — use 'combined' in production for log aggregators
const morganFormat = env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(morgan(morganFormat, {
  stream: {
    write: (message: string) => logger.http(message.trim()),
  },
}));

// Apply database connectivity check to all API endpoints
app.use('/api', ensureDbConnected);

// Apply rate limiters
app.use('/api', generalLimiter);
app.use('/api/v1/auth', authLimiter);
app.use('/api/v1/ai', aiLimiter);

app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  const isHealthy = mongoose.connection.readyState === 1;
  res.status(isHealthy ? 200 : 503).json({
    success: isHealthy,
    message: isHealthy ? 'Server is running' : 'Server is running but database is disconnected',
    database: dbStatus,
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// 3. API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/resumes', resumeRoutes);
app.use('/api/v1/ai', aiRoutes);

// 4. Global Error Handling Middleware
app.use(errorHandler);

// Start Server
const server = app.listen(PORT, '0.0.0.0', () => {
  logger.info(`Server is running on port ${PORT} in ${env.NODE_ENV} mode`);
});

// 5. Graceful Shutdown handlers
const handleShutdown = (signal: string) => {
  logger.info(`Received ${signal}. Shutting down gracefully...`);
  server.close(async () => {
    logger.info('Express server closed.');
    try {
      await mongoose.connection.close();
      logger.info('MongoDB connection closed.');
      process.exit(0);
    } catch (err) {
      logger.error('Error during database shutdown connection close:', err);
      process.exit(1);
    }
  });
};

process.on('SIGINT', () => handleShutdown('SIGINT'));
process.on('SIGTERM', () => handleShutdown('SIGTERM'));

// 6. Safety net for unhandled async rejections and uncaught exceptions
process.on('unhandledRejection', (reason: unknown) => {
  logger.error('UNHANDLED REJECTION — shutting down:', reason);
  server.close(() => process.exit(1));
});

process.on('uncaughtException', (err: Error) => {
  logger.error('UNCAUGHT EXCEPTION — shutting down:', err);
  process.exit(1);
});

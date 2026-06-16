import mongoose from 'mongoose';
import { env } from './env.js';
import logger from '../utils/logger.js';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(env.MONGO_URI);
    logger.info('Successfully connected to MongoDB Cluster.');
  } catch (err) {
    logger.error('Failed to establish initial MongoDB connection:', err);
    process.exit(1);
  }
};

mongoose.connection.on('error', (err) => {
  logger.error('Mongoose connection error occurred:', err);
});

mongoose.connection.on('disconnected', () => {
  logger.warn('Mongoose connection was lost.');
});

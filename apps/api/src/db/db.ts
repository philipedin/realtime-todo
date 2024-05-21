import mongoose from 'mongoose';
import { Logger } from '../logger/logger';

export const db = (logger: Logger, uri: string) => {
  const connect = async () => {
    try {
      await mongoose.connect(uri);
      logger.info('connected to MongoDB');
    } catch (err) {
      logger.error(err, 'failed to connect to MongoDB');
      process.exit(1);
    }
  };

  mongoose.connection.on('disconnected', () => {
    logger.warn('disconnected from MongoDB');
    connect().catch((err) => {
      logger.error(err, 'failed to reconnect to MongoDB');
      process.exit(1);
    });
  });

  return {
    connect,
  };
};

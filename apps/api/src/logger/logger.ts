import pino, { Logger as PinoLogger } from 'pino';

import { Config } from '../config/config';

export type Logger = PinoLogger;

export const createLogger = (config: Config) =>
  pino({
    name: 'api',
    level: config.logLevel,
    ...(config.environment === 'development'
      ? {
          transport: {
            target: 'pino-pretty',
            options: {
              colorize: true,
            },
          },
        }
      : {}),
  });

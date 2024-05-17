import { Logger } from 'pino';
import pinoHTTP from 'pino-http';

import { Config } from '../../config/config';

export const createHttpLogger = (config: Config, logger: Logger) =>
  pinoHTTP({ logger, level: config.logLevel });

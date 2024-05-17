import { Event, Socket } from 'socket.io';

import { clientToServerSchemas } from '@realtime-todo/interfaces';
import { Logger } from '../../logger/logger';

export const validateData =
  (logger: Logger, socket: Socket) =>
  async ([event, data]: Event, next: (err?: Error) => void) => {
    const schema = clientToServerSchemas[event];
    if (!schema) {
      return next();
    }

    try {
      await schema.parseAsync(data);
      next();
    } catch (error) {
      logger.error({ event, error }, 'event error');

      return socket.emit('error', { message: 'Invalid data' });
    }
  };

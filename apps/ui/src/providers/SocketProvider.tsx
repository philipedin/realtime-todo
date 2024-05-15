import { ReactNode, createContext, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '@realtime-todo/types';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  'http://localhost:3000'
);

export const SocketContext = createContext<typeof socket | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const handleConnect = () => console.log('Connected to server');
    const handleDisconnect = () => console.log('Disconnected from server');

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
    };
  }, []);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

import { ReactNode, createContext, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '@realtime-todo/interfaces';
import { useToast } from '@chakra-ui/react';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  'http://localhost:3000'
);

export const SocketContext = createContext<typeof socket | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const toast = useToast();

  useEffect(() => {
    const handleConnect = () => console.log('Connected to server');
    const handleDisconnect = () => console.log('Disconnected from server');
    const handleError = ({ message }: { message: string }) =>
      toast({
        title: 'Server error',
        description: message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('error', handleError);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('error', handleError);
    };
  }, [toast]);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

import { ReactNode, createContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '@realtime-todo/interfaces';
import { useToast } from '@chakra-ui/react';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  'http://localhost:3000'
);

export const SocketContext = createContext<{
  socket: typeof socket | null;
  isInitialized: boolean;
  isConnected: boolean;
}>({ socket: null, isInitialized: false, isConnected: false });

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const toast = useToast();

  useEffect(() => {
    const handleConnect = () => {
      if (!isInitialized) {
        setIsInitialized(true);
      }
      setIsConnected(true);
    };
    const handleDisconnect = () => setIsConnected(false);
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
  }, [isInitialized, toast]);
  return (
    <SocketContext.Provider value={{ socket, isInitialized, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

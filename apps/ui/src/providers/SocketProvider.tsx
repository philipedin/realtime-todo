import { ReactNode, createContext, useEffect, useState } from 'react';
import socketIO, { Socket } from 'socket.io-client';

export const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketIo = socketIO('http://localhost:3000');
    setSocket(socketIo);

    const handleConnect = () => console.log('Connected to server');
    const handleDisconnect = () => console.log('Disconnected from server');

    socketIo.on('connect', handleConnect);
    socketIo.on('disconnect', handleDisconnect);

    return () => {
      socketIo.off('connect', handleConnect);
      socketIo.off('disconnect', handleDisconnect);
    };
  }, []);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

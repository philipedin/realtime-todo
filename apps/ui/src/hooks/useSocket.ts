import { useContext } from 'react';

import { SocketContext } from '../providers/SocketProvider';

export const useSocket = () => {
  const { isInitialized, isConnected, socket } = useContext(SocketContext);
  if (!socket) {
    throw new Error('No SocketProvider found');
  }

  return { isInitialized, isConnected, socket };
};

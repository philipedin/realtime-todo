import { Box, Slide } from '@chakra-ui/react';

import { useSocket } from '../../hooks/useSocket';

export const NetworkStatusIndicator = () => {
  const { isInitialized, isConnected } = useSocket();

  return (
    <Slide
      data-testid="network-status-indicator"
      in={isInitialized && !isConnected}
      direction="bottom"
    >
      <Box color="white" bg="red.500" p={2}>
        You are currently offline.
      </Box>
    </Slide>
  );
};

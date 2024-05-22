import { Box } from '@chakra-ui/react';

import { Header } from '../../components/Header/Header';
import { NetworkStatusIndicator } from '../../components/NetworkStatusIndicator/NetworkStatusIndicator';

export interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => (
  <Box>
    <NetworkStatusIndicator />
    <Header />
    <Box maxWidth="800px" mx="auto" my="120px">
      {children}
    </Box>
  </Box>
);

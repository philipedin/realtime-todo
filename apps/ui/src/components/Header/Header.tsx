import { Box, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const Header = () => (
  <Box data-testid="header" px={8} py={10}>
    <Link data-testid="home-link" to="/">
      <Heading as="h1" size="md">
        Realtime ToDo
      </Heading>
    </Link>
  </Box>
);

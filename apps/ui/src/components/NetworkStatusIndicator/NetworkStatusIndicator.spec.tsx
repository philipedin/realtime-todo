import { render } from '@testing-library/react';

import { SocketProvider } from '../../providers/SocketProvider/SocketProvider';
import { NetworkStatusIndicator } from './NetworkStatusIndicator';

describe('NetworkStatusIndicator', () => {
  it('renders without crashing', () => {
    render(
      <SocketProvider>
        <NetworkStatusIndicator />
      </SocketProvider>
    );
  });
});

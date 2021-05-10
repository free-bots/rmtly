/**
 *
 *                   _   _
 *                  | | | |
 *   _ __ _ __ ___ | |_| |_   _
 *  | '__| '_ ` _ \| __| | | | |
 *  | |  | | | | | | |_| | |_| |
 *  |_|  |_| |_| |_|\__|_|\__, |
 *                         __/ |
 *                        |___/
 */

import React, {useEffect} from 'react';
import {RootNavigator} from './views/pages/RootNavigator';
import {ConfigService} from './services/Config.service';
import {RootContextProvider} from './contexts/RootContextProvider';
import {ConnectivityCheck} from './views/components/connectivity/ConnectivityCheck';

const App = () => {
  useEffect(() => {
    ConfigService.forceUpdate();
  }, []);

  return (
    <RootContextProvider>
      <ConnectivityCheck>
        <RootNavigator />
      </ConnectivityCheck>
    </RootContextProvider>
  );
};

export default App;

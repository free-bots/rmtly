import {Router, Scene} from 'react-native-router-flux';
import {Applications} from '../views/pages/Applications';
import {Connection} from '../views/pages/settings/Connection';
import React from 'react';

export const Routes = () => (
  <Router>
    <Scene key="root">
      <Scene
        hideNavBar={true}
        key="application"
        component={Applications}
        title="Applications"
        initial={true}
      />
      <Scene key="connection" component={Connection} title="Connection" />
    </Scene>
  </Router>
);

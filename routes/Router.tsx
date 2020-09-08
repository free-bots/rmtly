import {Router, Scene} from 'react-native-router-flux';
import {Connection} from '../views/pages/settings/Connection';
import React from 'react';
import Home from '../views/pages/Home';

export const Routes = () => (
  <Router>
    <Scene key="root">
      <Scene
        hideNavBar={true}
        key="application"
        component={Home}
        title="Applications"
        initial={true}
      />
      <Scene key="connection" component={Connection} title="Connection" />
    </Scene>
  </Router>
);

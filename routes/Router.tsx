import {Actions, Router, Scene} from 'react-native-router-flux';
import {Connection} from '../views/pages/settings/Connection';
import React from 'react';
import Home from '../views/pages/Home';
import {Button} from 'react-native';

export const Routes = () => (
  <Router>
    <Scene key="root">
      <Scene
        renderRightButton={() => {
          return (
            <Button
              title={'Settings'}
              onPress={() => {
                Actions.connection();
              }}
            />
          );
        }}
        // hideNavBar={true}
        key="application"
        component={Home}
        title="Applications"
        initial={true}
      />
      <Scene key="connection" component={Connection} title="Connection" />
    </Scene>
  </Router>
);

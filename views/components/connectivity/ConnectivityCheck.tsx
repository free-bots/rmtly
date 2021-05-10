import React, {useContext, useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {Snackbar} from 'react-native-paper';
import {ConnectivityContext} from '../../../contexts/ConnectivityContext';

export const ConnectivityCheck = (props: any) => {
  const {offline, setState} = useContext(ConnectivityContext);

  useEffect(() => {
    const unsubscribeFromConnectivityCheck = NetInfo.addEventListener((state) => {
      setState(!state?.isConnected);
    });

    return () => {
      unsubscribeFromConnectivityCheck();
    };
  }, []);

  return (
    <>
      {props.children}
      <Snackbar visible={offline} onDismiss={() => {}}>
        offline :(
      </Snackbar>
    </>
  );
};

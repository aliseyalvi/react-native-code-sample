import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MainNavigator} from './MainNavigator';
import {useStores} from 'src/models/root-store';
import {AuthNavigator} from './AuthNavigator';
import {observer} from 'mobx-react-lite';

function RootNavigation() {
  const {authStore} = useStores();

  return (
    <NavigationContainer>
      {authStore.isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

export default observer(RootNavigation);

import React from 'react';
import colors from './res/colors';
import RootStore from '../store/RootStore';
import {StatusBar} from 'react-native';
import MyNavigator from './navigation/MyNavigator';
import StoreProvider from './hooks/StoreProvider';
import {NavigationContainer} from '@react-navigation/native';

export default function App() {
  const rootStore = new RootStore();

  return (
    <StoreProvider store={rootStore}>
      <NavigationContainer>
        <StatusBar
          translucent={false}
          backgroundColor={colors.white}
          barStyle={'dark-content'}
        />
        <MyNavigator />
      </NavigationContainer>
    </StoreProvider>
  );
}

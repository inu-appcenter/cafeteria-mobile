import Main from './features/main/Main';
import React from 'react';
import colors from './res/colors';
import RootStore from '../store/RootStore';
import {StatusBar} from 'react-native';
import StoreProvider from './hooks/StoreProvider';
import {NavigationContainer} from '@react-navigation/native';

const rootStore = new RootStore();

export default function App() {
  return (
    <StoreProvider store={rootStore}>
      <NavigationContainer>
        <StatusBar
          translucent={false}
          backgroundColor={colors.white}
          barStyle={'dark-content'}
        />
        <Main />
      </NavigationContainer>
    </StoreProvider>
  );
}

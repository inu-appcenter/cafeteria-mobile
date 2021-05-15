/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MyNavigator from './navigation/MyNavigator';
import colors from './res/colors';
import RootStore from '../store/RootStore';
import StoreProvider from './hooks/StoreProvider';

export default function App() {
  // 루트 스토어 생성은 여기에서!
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

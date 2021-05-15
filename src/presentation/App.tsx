import colors from './res/colors';
import RootStore from '../store/RootStore';
import {StatusBar} from 'react-native';
import MyNavigator from './navigation/MyNavigator';
import StoreProvider from './hooks/StoreProvider';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

export default function App() {
  // 루트 스토어 생성은 여기에서!
  const rootStore = new RootStore();

  // 로그인은 빠르게!
  useEffect(() => {
    rootStore.userStore.tryRememberedLogin();
  }, []);

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

import colors from './res/colors';
import RootStore from '../store/RootStore';
import {StatusBar} from 'react-native';
import MyNavigator from './navigation/MyNavigator';
import StoreProvider from './hooks/StoreProvider';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

export default function App() {
  const rootStore = new RootStore();

  useEffect(() => {
    onAppStart(rootStore);
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

async function onAppStart({userStore}: RootStore) {
  try {
    await userStore.tryRememberedLoginIfAvailable();
  } catch (e) {
    console.log(`저장된 사용자 정보로 로그인하는 데에 실패했습니다: ${e}`);
  }
}

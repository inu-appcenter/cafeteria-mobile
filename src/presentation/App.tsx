import Main from './features/main/Main';
import colors from './res/colors';
import RootStore from '../store/RootStore';
import {StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import StoreProvider from './hooks/StoreProvider';
import handleApiError from '../common/utils/handleApiError';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

const rootStore = new RootStore();

async function initializeApp() {
  setTimeout(() => SplashScreen.hide(), 100);

  try {
    await rootStore.init();
  } catch (e) {
    handleApiError(e);
  }
}

export default function App() {
  useEffect(() => {
    initializeApp();
  }, []);

  return (
    <StoreProvider store={rootStore}>
      <NavigationContainer>
        <StatusBar
          barStyle={'dark-content'}
          translucent={false}
          backgroundColor={colors.white}
        />
        <Main />
      </NavigationContainer>
    </StoreProvider>
  );
}

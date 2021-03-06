/**
 * This file is part of INU Cafeteria.
 *
 * Copyright 2021 INU Global App Center <potados99@gmail.com>
 *
 * INU Cafeteria is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * INU Cafeteria is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import Main from './features/main/Main';
import Splash from './components/Splash';
import RootStore from '../store/RootStore';
import StoreProvider from './hooks/StoreProvider';
import {navigationRef} from './global/GlobalNavigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import CheckAndInstallUpdate from '../domain/usecases/CheckAndInstallUpdate';

const rootStore = new RootStore();

function initializeApp() {
  CheckAndInstallUpdate.run().finally(() => {
    rootStore.startInitialization();
    Splash.hide();
  });
}

export default function App() {
  useEffect(() => {
    initializeApp();
  }, []);

  return (
    <StoreProvider store={rootStore}>
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef}>
          <Main />
        </NavigationContainer>
      </SafeAreaProvider>
    </StoreProvider>
  );
}

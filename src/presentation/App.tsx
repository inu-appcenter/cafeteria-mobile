/**
 * This file is part of INU Cafeteria.
 *
 * Copyright (C) 2021 INU Global App Center <potados99@gmail.com>
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
import colors from './res/colors';
import Splash from './components/Splash';
import codePush from 'react-native-code-push';
import RootStore from '../store/RootStore';
import {StatusBar} from 'react-native';
import StoreProvider from './hooks/StoreProvider';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

const rootStore = new RootStore();

function initializeApp() {
  Splash.hide();

  rootStore.startInitialization();
}

function App() {
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

/**
 * By default, CodePush will check for updates on every app start.
 * If an update is available, it will be silently downloaded, and installed
 * the next time the app is restarted (either explicitly by the end user or by the OS),
 * which ensures the least invasive experience for your end users.
 * If an available update is mandatory, then it will be installed immediately,
 * ensuring that the end user gets it as soon as possible.
 *
 * https://docs.microsoft.com/en-us/appcenter/distribution/codepush/rn-plugin
 */
export default codePush(App);

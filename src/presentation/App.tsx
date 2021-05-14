/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import 'reflect-metadata';

import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MyNavigator from './navigation/MyNavigator';
import colors from './res/colors';
import {Provider} from 'mobx-react';
import RootStore from '../store/RootStore';

export default class App extends React.Component {
  render() {
    const rootStore = new RootStore();

    return (
      <Provider {...rootStore}>
        <NavigationContainer>
          <StatusBar
            translucent={false}
            backgroundColor={colors.white}
            barStyle={'dark-content'}
          />
          <MyNavigator />
        </NavigationContainer>
      </Provider>
    );
  }
}

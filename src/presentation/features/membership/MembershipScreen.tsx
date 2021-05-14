import React from 'react';
import LoginScreen from './LoginScreen';
import BarcodeScreen from './BarcodeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import StackHeaderPresets from '../../components/utils/StackHeaderPresets';

export type MembershipNavigationParams = {
  Barcode: undefined;
  Login: undefined;
};

export default class MembershipScreen extends React.Component {
  render() {
    const Stack = createStackNavigator<MembershipNavigationParams>();

    return (
      <Stack.Navigator
        mode="modal"
        headerMode="screen"
        screenOptions={StackHeaderPresets.commonModalHeaderOptions}>
        <Stack.Screen
          name="Barcode"
          component={BarcodeScreen}
          options={{title: '멤버십'}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{title: '로그인'}}
        />
      </Stack.Navigator>
    );
  }
}

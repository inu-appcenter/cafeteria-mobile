import React from 'react';
import LoginScreen from './LoginScreen';
import BarcodeScreen from './BarcodeScreen';
import OnboardingScreen from './OnboardingScreen';
import {createStackNavigator} from '@react-navigation/stack';

export type MembershipNavigationParams = {
  Onboarding: undefined;
  Login: undefined;
  Barcode: undefined;
};

export default class MembershipScreen extends React.Component {
  render() {
    const Stack = createStackNavigator<MembershipNavigationParams>();

    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{title: '멤버십 '}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{title: '로그인'}}
        />
        <Stack.Screen
          name="Barcode"
          component={BarcodeScreen}
          options={{title: '멤버십'}}
        />
      </Stack.Navigator>
    );
  }
}

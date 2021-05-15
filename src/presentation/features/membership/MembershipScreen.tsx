import React from 'react';
import LoginScreen from './LoginScreen';
import BarcodeScreen from './BarcodeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import StackHeaderPresets from '../../components/utils/StackHeaderPresets';
import OnboardingScreen from './OnboardingScreen';
import useGlobalState from '../../hooks/useGlobalState';

export type MembershipNavigationParams = {
  Onboarding: undefined;
  Login: undefined;
  Barcode: undefined;
};

export default function MembershipScreen() {
  const {isLoggedIn} = useGlobalState();

  const Stack = createStackNavigator<MembershipNavigationParams>();

  const onboardingScreen = (
    <Stack.Screen
      key="onboarding_screen"
      name="Onboarding"
      component={OnboardingScreen}
      options={{title: '학생 할인 멤버십'}}
    />
  );

  const barcodeScreen = (
    <Stack.Screen
      key="barcode_screen"
      name="Barcode"
      component={BarcodeScreen}
      options={{title: '멤버십'}}
    />
  );

  const loginScreen = (
    <Stack.Screen
      key="login_screen"
      name="Login"
      component={LoginScreen}
      options={{title: '로그인'}}
    />
  );

  return (
    <Stack.Navigator
      mode="modal"
      headerMode="screen"
      screenOptions={StackHeaderPresets.commonModalHeaderOptions}>
      {isLoggedIn ? [barcodeScreen] : [onboardingScreen, loginScreen]}
    </Stack.Navigator>
  );
}

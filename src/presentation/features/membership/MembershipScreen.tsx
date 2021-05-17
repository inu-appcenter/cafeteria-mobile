import React from 'react';
import {observer} from 'mobx-react';
import LoginScreen from './LoginScreen';
import useUserState from '../../hooks/useUserState';
import BarcodeScreen from './BarcodeScreen';
import OnboardingScreen from './OnboardingScreen';
import StackHeaderPresets from '../../components/utils/StackHeaderPresets';
import {createStackNavigator} from '@react-navigation/stack';

export type MembershipNavigationParams = {
  Onboarding: undefined;
  Login: undefined;
  Barcode: undefined;
};

function MembershipScreen() {
  const {isLoggedIn} = useUserState();

  const Stack = createStackNavigator<MembershipNavigationParams>();

  const onboardingScreen = (
    <Stack.Screen
      key="onboarding_screen"
      name="Onboarding"
      component={OnboardingScreen}
      options={{headerShown: false}}
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

export default observer(MembershipScreen);

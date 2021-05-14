import React from 'react';
import LoginScreen from './LoginScreen';
import BarcodeScreen from './BarcodeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import StackHeaderPresets from '../../components/utils/StackHeaderPresets';
import OnboardingScreen from './OnboardingScreen';
import {inject, observer} from 'mobx-react';
import GlobalStore from '../../../store/GlobalStore';
import RootStore from '../../../store/RootStore';

export type MembershipNavigationParams = {
  Onboarding: undefined;
  Login: undefined;
  Barcode: undefined;
};

type Props = {
  globalStore: GlobalStore;
};

@inject(({globalStore}: RootStore) => ({globalStore}))
@observer
export default class MembershipScreen extends React.Component<Props> {
  render() {
    const {globalStore} = this.props;

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
        {globalStore.loggedIn
          ? [barcodeScreen]
          : [onboardingScreen, loginScreen]}
      </Stack.Navigator>
    );
  }
}

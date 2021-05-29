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

import React from 'react';
import Login from './Login';
import Barcode from './Barcode';
import Onboarding from './Onboarding';
import {observer} from 'mobx-react';
import useUserState from '../../hooks/useUserState';
import StackHeaderPresets from '../../components/utils/StackHeaderPresets';
import {createStackNavigator} from '@react-navigation/stack';
import MembershipInfoHeaderButton from './Barcode/MembershipInfoHeaderButton';

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
      component={Onboarding}
      options={{headerShown: false}}
    />
  );

  const barcodeScreen = (
    <Stack.Screen
      key="barcode_screen"
      name="Barcode"
      component={Barcode}
      options={{
        title: '멤버십',
        headerRight: MembershipInfoHeaderButton,
      }}
    />
  );

  const loginScreen = (
    <Stack.Screen
      key="login_screen"
      name="Login"
      component={Login}
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

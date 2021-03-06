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

import React from 'react';
import Barcode from './Barcode';
import NeedLogin from './NeedLogin';
import {observer} from 'mobx-react';
import useUserState from '../../hooks/useUserState';
import StackHeaderPresets from '../../components/utils/StackHeaderPresets';
import StudentLoginScreen from './../login/StudentLoginScreen';
import {createStackNavigator} from '@react-navigation/stack';
import MembershipInfoHeaderButton from './Barcode/MembershipInfoHeaderButton';

export type MembershipNavigationParams = {
  MembershipNeedLogin: undefined;
  MembershipStudentLogin: undefined;
  MembershipBarcode: undefined;
};

function MembershipScreen() {
  const {isLoggedInAsStudent} = useUserState();

  const Stack = createStackNavigator<MembershipNavigationParams>();

  const needLogin = (
    <Stack.Screen
      key="membership_need_login_screen"
      name="MembershipNeedLogin"
      component={NeedLogin}
      options={{headerShown: false}}
    />
  );

  const studentLogin = (
    <Stack.Screen
      key="membership_student_login_screen"
      name="MembershipStudentLogin"
      component={StudentLoginScreen}
      options={{title: '로그인'}}
    />
  );

  const barcode = (
    <Stack.Screen
      key="membership_barcode_screen"
      name="MembershipBarcode"
      component={Barcode}
      options={{
        title: '멤버십',
        headerRight: MembershipInfoHeaderButton,
      }}
    />
  );

  return (
    <Stack.Navigator headerMode="screen" screenOptions={StackHeaderPresets.commonStackHeaderOptions}>
      {isLoggedInAsStudent ? [barcode] : [needLogin, studentLogin]}
    </Stack.Navigator>
  );
}

export default observer(MembershipScreen);

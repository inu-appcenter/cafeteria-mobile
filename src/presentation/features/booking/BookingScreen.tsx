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

import Main from './Main';
import React from 'react';
import {observer} from 'mobx-react';
import Onboarding from './Onboarding';
import useUserState from '../../hooks/useUserState';
import GuestLoginScreen from '../login/GuestLoginScreen';
import StudentLoginScreen from '../login/StudentLoginScreen';
import StackHeaderPresets from '../../components/utils/StackHeaderPresets';
import {createStackNavigator} from '@react-navigation/stack';

export type BookingNavigationParams = {
  BookingOnboarding: undefined;
  BookingStudentLogin: undefined;
  BookingGuestLogin: undefined;
  BookingMain: undefined;
};

function BookingScreen() {
  const {isLoggedIn} = useUserState();

  const Stack = createStackNavigator<BookingNavigationParams>();

  const onboardingScreen = (
    <Stack.Screen
      key="booking_onboarding_screen"
      name="BookingOnboarding"
      component={Onboarding}
      options={{headerShown: false}}
    />
  );

  const studentLoginScreen = (
    <Stack.Screen
      key="booking_student_login_screen"
      name="BookingStudentLogin"
      component={StudentLoginScreen}
      options={{title: '재학생 로그인'}}
    />
  );

  const guestLoginScreen = (
    <Stack.Screen
      key="booking_guest_login_screen"
      name="BookingGuestLogin"
      component={GuestLoginScreen}
      options={{title: '휴대전화로 로그인'}}
    />
  );

  const mainScreen = (
    <Stack.Screen
      key="booking_main_screen"
      name="BookingMain"
      component={Main}
      options={{headerShown: false}}
    />
  );

  return (
    <Stack.Navigator
      mode="modal"
      headerMode="screen"
      screenOptions={StackHeaderPresets.commonModalHeaderOptions}>
      {isLoggedIn ? [mainScreen] : [onboardingScreen, studentLoginScreen, guestLoginScreen]}
    </Stack.Navigator>
  );
}

export default observer(BookingScreen);

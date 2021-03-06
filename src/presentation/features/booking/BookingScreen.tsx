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
import History from './History';
import Complete from './Complete';
import NeedLogin from './NeedLogin';
import useStores from '../../hooks/useStores';
import {observer} from 'mobx-react';
import Onboarding from './Onboarding';
import OptionsList from './OptionsList';
import useUserState from '../../hooks/useUserState';
import OptionsDetail from './OptionsDetail';
import CafeteriaView from '../cafeteria/CafeteriaView';
import GuestLoginScreen from '../login/GuestLoginScreen';
import StudentLoginScreen from '../login/StudentLoginScreen';
import StackHeaderPresets from '../../components/utils/StackHeaderPresets';
import {createStackNavigator} from '@react-navigation/stack';
import BookingInfoHeaderButton from './History/BookingInfoHeaderButton';
import BookingOptionInfoHeaderButton from './OptionsDetail/BookingOptionInfoHeaderButton';

export type BookingNavigationParams = {
  BookingOnboarding: undefined;
  BookingNeedLogin: undefined;
  BookingStudentLogin: undefined;
  BookingGuestLogin: undefined;

  BookingHistory: undefined;
  BookingOptionsList: undefined;
  BookingOptionsDetail: {cafeteria: CafeteriaView};
  BookingComplete: undefined;
};

function BookingScreen() {
  const {isLoggedIn} = useUserState();
  const {bookingStore} = useStores();

  const Stack = createStackNavigator<BookingNavigationParams>();

  /**
   * ?????? ??????(?????????) ??????.
   */
  const onboarding = (
    <Stack.Screen
      key="booking_onboarding"
      name="BookingOnboarding"
      component={Onboarding}
      options={{headerShown: false}}
    />
  );

  /**
   * ????????? ???????????? ??????.
   * ?????????????????? ?????????????????? ????????? ??????.
   */
  const needLogin = (
    <Stack.Screen
      key="booking_need_login"
      name="BookingNeedLogin"
      component={NeedLogin}
      options={{headerShown: false}}
    />
  );

  /**
   * ???????????? ??????????????? ??????.
   */
  const studentLogin = (
    <Stack.Screen
      key="booking_student_login"
      name="BookingStudentLogin"
      component={StudentLoginScreen}
      options={{title: '????????? ?????????'}}
    />
  );

  /**
   * ????????????????????? ??????????????? ??????.
   */
  const guestLogin = (
    <Stack.Screen
      key="booking_guest_login"
      name="BookingGuestLogin"
      component={GuestLoginScreen}
      options={{title: '??????????????? ?????????'}}
    />
  );

  /**
   * ?????? ?????? ??????.
   */
  const history = (
    <Stack.Screen
      key="booking_my_bookings"
      name="BookingHistory"
      component={History}
      options={{
        title: '?????? ??????',
        headerRight: () => <BookingInfoHeaderButton />,
      }}
    />
  );

  /**
   * ?????? ?????? ?????? ??????.
   */
  const list = (
    <Stack.Screen
      key="booking_options_list"
      name="BookingOptionsList"
      component={OptionsList}
      options={{
        title: '?????? ??????',
      }}
    />
  );

  /**
   * ?????? ??? ?????? ?????? ????????? ??????.
   */
  const detail = (
    <Stack.Screen
      key="booking_options_detail"
      name="BookingOptionsDetail"
      component={OptionsDetail}
      options={{
        title: '?????? ??????',
        headerRight: () => <BookingOptionInfoHeaderButton />,
      }}
    />
  );

  /**
   * ?????? ?????? ??????.
   */
  const complete = (
    <Stack.Screen
      key="booking_complete"
      name="BookingComplete"
      component={Complete}
      options={{
        headerShown: false,
        gestureEnabled: false,
      }}
    />
  );

  const beforeOnboarding = [onboarding];
  const afterOnboarding = isLoggedIn
    ? [history, list, detail, complete]
    : [needLogin, studentLogin, guestLogin];

  return (
    <Stack.Navigator headerMode="screen" screenOptions={StackHeaderPresets.commonStackHeaderOptions}>
      {bookingStore.onboardingHasShown ? afterOnboarding : beforeOnboarding}
    </Stack.Navigator>
  );
}

export default observer(BookingScreen);

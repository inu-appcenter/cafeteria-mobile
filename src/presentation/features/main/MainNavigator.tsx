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
import colors from '../../res/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useStores from '../../hooks/useStores';
import {StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BookingScreen from '../booking/BookingScreen';
import SupportScreen from '../support/SupportScreen';
import CafeteriaScreen from '../cafeteria/CafeteriaScreen';
import MembershipScreen from '../membership/MembershipScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import tabBarIconSelector, {IconConfigs} from '../../components/utils/tabBarIconSelector';
import {observer} from 'mobx-react';

const icons: IconConfigs = {
  Cafeteria: ['restaurant', 'restaurant', MaterialIcons],
  Booking: ['ticket-confirmation', 'ticket-confirmation-outline', MaterialCommunityIcons],
  Membership: ['barcode', 'barcode-outline', Ionicons],
  Support: ['support-agent', 'support-agent', MaterialIcons],
};

function MainNavigator() {
  const {bookingStore, versionStore} = useStores();

  const BottomTab = createBottomTabNavigator();

  const bookingTab = (
    <BottomTab.Screen
      name="Booking"
      component={BookingScreen}
      options={{
        title: '예약',
        tabBarBadge: bookingStore.hasBookings ? bookingStore.myBookings?.length : undefined,
        tabBarBadgeStyle: {fontSize: 12},
      }}
    />
  );

  return (
    <BottomTab.Navigator
      tabBarOptions={{
        activeTintColor: colors.textPrimary,
        inactiveTintColor: colors.textDisabled,
        labelStyle: styles.tabBarLabel,
      }}
      screenOptions={({route}) => ({
        tabBarIcon: tabBarIconSelector(icons, route.name),
      })}>
      <BottomTab.Screen name="Cafeteria" component={CafeteriaScreen} options={{title: '식단'}} />
      {versionStore.betaFeatureEnabled && bookingTab}
      <BottomTab.Screen name="Membership" component={MembershipScreen} options={{title: '멤버십'}} />
      <BottomTab.Screen name="Support" component={SupportScreen} options={{title: '지원'}} />
    </BottomTab.Navigator>
  );
}

export default observer(MainNavigator);

const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: 12,
  },
});

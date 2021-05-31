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
import {StyleSheet} from 'react-native';
import SupportScreen from '../support/SupportScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CafeteriaScreen from '../cafeteria/CafeteriaScreen';
import MembershipScreen from '../membership/MembershipScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import tabBarIconSelector, {
  IconConfigs,
} from '../../components/utils/tabBarIconSelector';

const icons: IconConfigs = {
  Cafeteria: ['restaurant', 'restaurant', MaterialIcons],
  Membership: ['barcode', 'barcode-outline', Ionicons],
  Support: ['support-agent', 'support-agent', MaterialIcons],
};

export default function MainNavigator() {
  const BottomTab = createBottomTabNavigator();

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
      <BottomTab.Screen
        name="Cafeteria"
        component={CafeteriaScreen}
        options={{title: '식단'}}
      />
      <BottomTab.Screen
        name="Membership"
        component={MembershipScreen}
        options={{title: '할인'}}
      />
      <BottomTab.Screen
        name="Support"
        component={SupportScreen}
        options={{title: '지원'}}
      />
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: 12,
  },
});

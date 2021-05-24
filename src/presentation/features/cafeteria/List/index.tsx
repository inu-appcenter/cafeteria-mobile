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

import Page from './Page';
import React from 'react';
import colors from '../../../res/colors';
import palette from '../../../res/palette';
import {StyleSheet} from 'react-native';
import createIndicatorStyle from '../../../components/utils/createIndicatorStyle';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

type DateTabParams = {
  dateOffset: number;
};

export type CafeteriaDateTabNavigationParams = {
  DateTab1: DateTabParams;
  DateTab2: DateTabParams;
  DateTab3: DateTabParams;
  DateTab4: DateTabParams;
  DateTab5: DateTabParams;
};

export default function List() {
  const Tab = createMaterialTopTabNavigator<CafeteriaDateTabNavigationParams>();

  return (
    <Tab.Navigator
      swipeEnabled={false}
      tabBarOptions={{
        style: styles.tabBar,
        tabStyle: styles.tab,
        labelStyle: styles.label,
        indicatorStyle: styles.indicator,
        activeTintColor: colors.textPrimary,
        inactiveTintColor: colors.textDisabled,
      }}>
      <Tab.Screen
        name="DateTab1"
        component={Page}
        options={{title: '오늘'}}
        initialParams={{dateOffset: +0}}
      />
      <Tab.Screen
        name="DateTab2"
        component={Page}
        options={{title: '내일'}}
        initialParams={{dateOffset: +1}}
      />
      <Tab.Screen
        name="DateTab3"
        component={Page}
        options={{title: '모레'}}
        initialParams={{dateOffset: +2}}
      />
      <Tab.Screen
        name="DateTab4"
        component={Page}
        options={{title: '글피'}}
        initialParams={{dateOffset: +3}}
      />
      <Tab.Screen
        name="DateTab5"
        component={Page}
        options={{title: '그글피'}}
        initialParams={{dateOffset: +4}}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    ...palette.shadowedTopBar,
  },
  tab: {
    paddingTop: 0,
    height: 40,
  },
  label: {
    fontSize: 14,
    padding: 0,
  },
  indicator: {
    ...createIndicatorStyle({
      numberOfTabs: 5,
      marginHorizontal: 16,
    }),
    backgroundColor: colors.textPrimary,
    borderRadius: 1,
  },
});

import React from 'react';
import colors from '../../../res/colors';
import palette from '../../../res/palette';
import {StyleSheet} from 'react-native';
import CafeteriaListPage from './CafeteriaListPage';
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

export default function CafeteriaListScreen() {
  const Tab = createMaterialTopTabNavigator<CafeteriaDateTabNavigationParams>();

  return (
    <Tab.Navigator
      swipeEnabled={false}
      tabBarOptions={{
        style: styles.tabBar,
        tabStyle: styles.tab,
        labelStyle: styles.label,
        indicatorStyle: styles.indicator,
        activeTintColor: colors.mainTint,
        inactiveTintColor: colors.textDisabled,
      }}>
      <Tab.Screen
        name="DateTab1"
        component={CafeteriaListPage}
        options={{title: '오늘'}}
        initialParams={{dateOffset: +0}}
      />
      <Tab.Screen
        name="DateTab2"
        component={CafeteriaListPage}
        options={{title: '내일'}}
        initialParams={{dateOffset: +1}}
      />
      <Tab.Screen
        name="DateTab3"
        component={CafeteriaListPage}
        options={{title: '모레'}}
        initialParams={{dateOffset: +2}}
      />
      <Tab.Screen
        name="DateTab4"
        component={CafeteriaListPage}
        options={{title: '글피'}}
        initialParams={{dateOffset: +3}}
      />
      <Tab.Screen
        name="DateTab5"
        component={CafeteriaListPage}
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
    backgroundColor: colors.mainTint,
    borderRadius: 1,
  },
});

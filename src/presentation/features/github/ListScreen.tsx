import React from 'react';
import ListPage from './ListPage';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import palette from '../../res/palette';
import colors from '../../res/colors';
import createIndicatorStyle from '../../components/utils/createIndicatorStyle';
import {StyleSheet} from 'react-native';

export default class ListScreen extends React.Component {
  render() {
    const Tab = createMaterialTopTabNavigator();

    return (
      <Tab.Navigator
        swipeEnabled={false}
        tabBarOptions={{
          style: styles.tabBar,
          labelStyle: styles.label,
          indicatorStyle: styles.indicator,
          activeTintColor: colors.themeBlue,
          inactiveTintColor: colors.textDisabled,
        }}>
        <Tab.Screen name="오늘" component={ListPage} />
        <Tab.Screen name="내일" component={ListPage} />
        <Tab.Screen name="모레" component={ListPage} />
        <Tab.Screen name="글피" component={ListPage} />
        <Tab.Screen name="그글피" component={ListPage} />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    padding: 0,
  },
  tabBar: {
    ...palette.shadowedTopBar,
  },
  indicator: {
    ...createIndicatorStyle({
      numberOfTabs: 5,
      marginHorizontal: 16,
    }),
    backgroundColor: colors.themeBlue,
  },
});

import React from 'react';
import CounterScreen from '../features/counter/CounterScreen';
import CafeteriaScreen from '../features/cafeteria/CafeteriaScreen';
import tabBarIconSelector from '../components/utils/tabBarIconSelector';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colors from '../res/colors';
import MembershipScreen from '../features/membership/MembershipScreen';

export default class MyNavigator extends React.Component {
  public icons = {
    Cafeteria: ['restaurant', 'restaurant-outline'],
    Membership: ['barcode', 'barcode-outline'],
    Counter: ['stopwatch', 'stopwatch-outline'],
  };

  render() {
    const BottomTab = createBottomTabNavigator();

    return (
      <BottomTab.Navigator
        tabBarOptions={{
          activeTintColor: colors.themeBlue,
        }}
        screenOptions={({route}) => ({
          tabBarIcon: tabBarIconSelector(this.icons, route.name),
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

        <BottomTab.Screen name="Counter" component={CounterScreen} />
      </BottomTab.Navigator>
    );
  }
}

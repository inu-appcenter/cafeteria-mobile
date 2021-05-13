import React from 'react';
import HomeScreen from '../features/home/HomeScreen';
import CounterScreen from '../features/counter/CounterScreen';
import CafeteriaScreen from '../features/cafeteria/CafeteriaScreen';
import tabBarIconSelector from '../components/utils/tabBarIconSelector';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colors from '../res/colors';

export default class MyNavigator extends React.Component {
  public icons = {
    Home: ['home', 'home-outline'],
    Counter: ['paw', 'paw-outline'],
    Cafeteria: ['restaurant', 'restaurant-outline'],
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
        <BottomTab.Screen name="Home" component={HomeScreen} />
        <BottomTab.Screen name="Counter" component={CounterScreen} />
        <BottomTab.Screen name="Cafeteria" component={CafeteriaScreen} />
      </BottomTab.Navigator>
    );
  }
}

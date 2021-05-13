import React from 'react';
import HomeScreen from '../features/home/HomeScreen';
import CounterScreen from '../features/counter/CounterScreen';
import GithubScreen from '../features/github/GithubScreen';
import tabBarIconSelector from '../components/utils/tabBarIconSelector';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

export default class MyNavigator extends React.Component {
  public icons = {
    Home: ['home', 'home-outline'],
    Counter: ['paw', 'paw-outline'],
    GitHub: ['code', 'code-outline'],
  };

  render() {
    const BottomTab = createBottomTabNavigator();

    return (
      <BottomTab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: tabBarIconSelector(this.icons, route.name),
        })}>
        <BottomTab.Screen name="Home" component={HomeScreen} />
        <BottomTab.Screen name="Counter" component={CounterScreen} />
        <BottomTab.Screen name="GitHub" component={GithubScreen} />
      </BottomTab.Navigator>
    );
  }
}

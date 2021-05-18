import React from 'react';
import colors from '../res/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SupportScreen from '../features/support/SupportScreen';
import CafeteriaScreen from '../features/cafeteria/CafeteriaScreen';
import MembershipScreen from '../features/membership/MembershipScreen';
import tabBarIconSelector, {
  IconConfigs,
} from '../components/utils/tabBarIconSelector';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

export default class MainNavigator extends React.Component {
  public icons: IconConfigs = {
    Cafeteria: ['restaurant', 'restaurant', MaterialIcons],
    Membership: ['barcode', 'barcode-outline', Ionicons],
    Support: ['support-agent', 'support-agent', MaterialIcons],
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
        <BottomTab.Screen
          name="Support"
          component={SupportScreen}
          options={{title: '지원'}}
        />
      </BottomTab.Navigator>
    );
  }
}

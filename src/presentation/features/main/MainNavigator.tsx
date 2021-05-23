import React from 'react';
import colors from '../../res/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {register} from 'react-native-bundle-splitter';
import {StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
        component={register({
          loader: () => import('../cafeteria/CafeteriaScreen'),
        })}
        options={{title: '식단'}}
      />
      <BottomTab.Screen
        name="Membership"
        component={register({
          loader: () => import('../membership/MembershipScreen'),
        })}
        options={{title: '할인'}}
      />
      <BottomTab.Screen
        name="Support"
        component={register({
          loader: () => import('../support/SupportScreen'),
        })}
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

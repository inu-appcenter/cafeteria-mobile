import React from 'react';
import Icons from 'react-native-vector-icons/Ionicons';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs/src/types';

/**
 * Tab bar icon selector generator for BottomTabNavigator.
 *
 * @param icons pairs of tab name to icon names.
 *              The icons names is an array of size 2,
 *              having first item as an unfocused icon name,
 *              and the second as a focused one.
 * @param screenName name of the route.
 */
export default function tabBarIconSelector(
  icons: Record<string, string[]>,
  screenName: string,
): BottomTabNavigationOptions['tabBarIcon'] {
  return ({focused, color, size}) => {
    return (
      <Icons
        name={icons[screenName]?.[focused ? 1 : 0] || 'error'}
        size={size}
        color={color}
      />
    );
  };
}

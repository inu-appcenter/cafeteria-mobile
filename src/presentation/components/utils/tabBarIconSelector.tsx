import Ionicons from 'react-native-vector-icons/Ionicons';
import {IconProps} from 'react-native-vector-icons/Icon';
import React, {ComponentType} from 'react';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs/src/types';

export type IconConfigs = Record<
  string,
  [string, string, ComponentType<IconProps>?]
>;

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
  icons: IconConfigs,
  screenName: string,
): BottomTabNavigationOptions['tabBarIcon'] {
  return ({focused, color, size}) => {
    const IconClass = icons[screenName]?.[2] || Ionicons;

    return (
      <IconClass
        name={icons[screenName]?.[focused ? 0 : 1] || 'error'}
        size={size}
        color={color}
      />
    );
  };
}

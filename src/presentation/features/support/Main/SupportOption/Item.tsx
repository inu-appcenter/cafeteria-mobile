import React, {ComponentType} from 'react';
import {Text, View} from 'react-native';
import Touchable from '../../../../components/Touchable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ChevronRight from '../../../../components/ChevronRight';
import {IconProps} from 'react-native-vector-icons/Icon';
import colors from '../../../../res/colors';
import palette from '../../../../res/palette';
import {
  SupportMainNavigation,
  SupportNavigationParams,
} from '../../SupportScreen';

export type SupportOptionProps = {
  icon: [string, ComponentType<IconProps>?];
  title: string;
  navigation?: SupportMainNavigation;
  navigationDestination: keyof SupportNavigationParams;
};

export default function Item({
  icon,
  title,
  navigation,
  navigationDestination,
}: SupportOptionProps) {
  if (navigation === undefined) {
    console.warn(
      'SupportOption.Item must be provided a navigation from its direct parent!',
    );
    return null;
  }

  const IconClass = icon[1] || Ionicons;

  return (
    <Touchable
      style={{alignSelf: 'stretch'}}
      onPress={() => navigation.navigate(navigationDestination)}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <IconClass
            name={icon[0]}
            size={22}
            color={colors.textPrimary}
            style={{marginStart: 6}}
          />
          <Text style={{...palette.textPrimary, marginStart: 12}}>{title}</Text>
        </View>
        <ChevronRight />
      </View>
    </Touchable>
  );
}

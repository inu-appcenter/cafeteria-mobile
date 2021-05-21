import colors from '../../../../res/colors';
import palette from '../../../../res/palette';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Touchable from '../../../../components/Touchable';
import {IconProps} from 'react-native-vector-icons/Icon';
import ChevronRight from '../../../../components/ChevronRight';
import React, {ComponentType} from 'react';
import {StyleSheet, Text, View} from 'react-native';
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
      <View style={styles.rootContainer}>
        <View style={styles.leftContainer}>
          <IconClass
            name={icon[0]}
            size={22}
            color={colors.textPrimary}
            style={styles.icon}
          />
          <Text style={styles.titleText}>{title}</Text>
        </View>
        <ChevronRight />
      </View>
    </Touchable>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  leftContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  icon: {
    marginStart: 8,
  },
  titleText: {
    ...palette.textPrimary,
    marginStart: 12,
  },
});

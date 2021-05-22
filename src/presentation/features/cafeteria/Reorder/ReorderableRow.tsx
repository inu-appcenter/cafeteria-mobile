import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import colors from '../../../res/colors';
import palette from '../../../res/palette';
import CafeteriaView from '../CafeteriaView';
import {RenderItemParams} from 'react-native-draggable-flatlist';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';

export default function ReorderableRow({
  item,
  drag,
  isActive,
}: RenderItemParams<CafeteriaView>) {
  const computedStyles = StyleSheet.create({
    rowContainer: {
      backgroundColor: isActive ? colors.rippleColorLight : 'transparent',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
    },
  });

  return (
    <TouchableWithoutFeedback onLongPress={drag} delayLongPress={50}>
      <View style={computedStyles.rowContainer}>
        <Text style={[palette.textPrimary, palette.boldText]}>
          {item.displayName}
        </Text>
        <Icon name="menu" size={24} color={colors.textSecondary} />
      </View>
    </TouchableWithoutFeedback>
  );
}

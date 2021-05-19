import React from 'react';
import colors from '../res/colors';
import {Platform, StyleSheet, View, ViewProps} from 'react-native';

export default function ItemSeparator({style}: ViewProps) {
  return <View style={[styles.separator, style]} />;
}

const styles = StyleSheet.create({
  separator: {
    height: Platform.OS === 'android' ? 0.5 : 0.3,
    alignSelf: 'stretch',
    backgroundColor: colors.dividerColorLight,
  },
});

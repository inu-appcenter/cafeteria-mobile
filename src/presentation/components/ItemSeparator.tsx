import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import colors from '../res/colors';

export default class ItemSeparator extends React.Component {
  render() {
    return <View style={styles.separator} />;
  }
}

const styles = StyleSheet.create({
  separator: {
    height: Platform.OS === 'android' ? 0.5 : 0.4,
    width: '100%',
    backgroundColor: colors.dividerColorLight,
  },
});

import React from 'react';
import colors from '../res/colors';
import palette from '../res/palette';
import {StyleSheet, Text, View, ViewProps} from 'react-native';

type Props = ViewProps & {
  whatWentWrong: string;
  showBorder: boolean;
};

export default function EmptyView({style, whatWentWrong, showBorder}: Props) {
  const computedBorderStyle = showBorder
    ? {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.textTertiary,
      }
    : {};

  return (
    <View style={[styles.emptyView, computedBorderStyle, style]}>
      <Text style={styles.title}>뭔가심상치않은일이일어났습니다🧐</Text>
      <Text style={styles.body}>{whatWentWrong}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyView: {
    ...palette.centeringContainer,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
  },

  title: {
    ...palette.textSecondary,
    fontWeight: 'bold',
  },

  body: {
    ...palette.textSecondary,
    marginTop: 8,
  },
});

import React from 'react';
import colors from '../res/colors';
import palette from '../res/palette';
import {StyleSheet, Text, View, ViewProps} from 'react-native';
import {Button} from 'react-native-paper';
import PaperPresets from './utils/PaperPresets';

type Props = ViewProps & {
  whatWentWrong: string;
  showBorder: boolean;
  retry?: () => void;
};

export default function EmptyView({
  style,
  whatWentWrong,
  showBorder,
  retry,
}: Props) {
  const computedBorderStyle = showBorder
    ? {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.textTertiary,
      }
    : {};

  const retryButton = (
    <Button
      {...PaperPresets.grayBorderedButton}
      onPress={retry}
      style={styles.retryButton}>
      다시 시도
    </Button>
  );

  return (
    <View style={[styles.emptyView, computedBorderStyle, style]}>
      <Text style={styles.title}>정보가 없습니다🧐</Text>
      <Text style={styles.body}>{whatWentWrong}</Text>
      {retry ? retryButton : null}
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

  retryButton: {
    marginTop: 16,
  },
});

/**
 * This file is part of INU Cafeteria.
 *
 * Copyright 2021 INU Global App Center <potados99@gmail.com>
 *
 * INU Cafeteria is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * INU Cafeteria is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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

export default function SomethingWentWrongView({style, whatWentWrong, showBorder, retry}: Props) {
  const computedBorderStyle = showBorder
    ? {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.textTertiary,
      }
    : {};

  const retryButton = (
    <Button {...PaperPresets.grayBorderedButton} onPress={retry} style={styles.retryButton}>
      다시 시도
    </Button>
  );

  return (
    <View style={[styles.somethingWentWrongView, computedBorderStyle, style]}>
      <Text style={styles.title}>정보가 없습니다🧐</Text>
      <Text style={styles.body}>{whatWentWrong}</Text>
      {retry ? retryButton : null}
    </View>
  );
}

const styles = StyleSheet.create({
  somethingWentWrongView: {
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

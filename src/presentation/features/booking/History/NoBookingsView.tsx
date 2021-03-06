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

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import colors from '../../../res/colors';
import palette from '../../../res/palette';
import {StyleSheet, Text, View} from 'react-native';

export default function NoBookingsView() {
  return (
    <View style={[palette.centeringContainer, palette.whiteBackground]}>
      <View style={styles.emptyViewContainer}>
        <Icon name="ticket-confirmation" size={112} color={colors.textTertiary} />
        <Text style={styles.emptyViewTitle}>π μμ½ λ΄μ­μ΄ μ¬κΈ°μ λνλμ</Text>
        <Text style={styles.emptyViewBody}>μ€λ₯Έμͺ½ μλ λ²νΌμ λλ¬μ{'\n'}μλ‘μ΄ μμ½μ λ§λ€μ΄λ³΄μΈμ :)</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyViewContainer: {
    ...palette.centeringContainer,
    margin: 21,
    paddingBottom: 154,
  },
  emptyViewTitle: {
    ...palette.textSubHeader,
    marginTop: 24,
  },
  emptyViewBody: {
    ...palette.textSecondary,
    textAlign: 'center',
    marginTop: 16,
  },
});

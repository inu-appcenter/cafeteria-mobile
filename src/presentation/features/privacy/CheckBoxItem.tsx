/**
 * This file is part of INU Cafeteria.
 *
 * Copyright (C) 2021 INU Global App Center <potados99@gmail.com>
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
import {StyleSheet, Text} from 'react-native';
import palette from '../../res/palette';
import CardView from '../../components/CardView';
import {Divider} from 'react-native-paper';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import colors from '../../res/colors';

type Props = {
  name: string;
  content: string;
  onCheckChanged: (checked: boolean) => void;
};

export default function CheckBoxItem({name, content, onCheckChanged}: Props) {
  return (
    <CardView style={styles.cardView}>
      <BouncyCheckbox
        text={name}
        style={styles.checkBox}
        fillColor={colors.mainTint}
        textStyle={styles.checkBoxText}
        onPress={isChecked => onCheckChanged(isChecked ?? false)}
      />

      <Divider style={{marginVertical: 8}} />

      <Text style={styles.checkBoxContent}>{content}</Text>
    </CardView>
  );
}

const styles = StyleSheet.create({
  cardView: {
    padding: 12,
    paddingHorizontal: 24,
    marginTop: 24,
  },
  checkBox: {},
  checkBoxText: {
    ...palette.textPrimary,
    fontWeight: 'bold',
    paddingVertical: 8,
    textDecorationLine: 'none',
  },
  checkBoxContent: {
    ...palette.textSecondary,
    paddingVertical: 4,
  },
});

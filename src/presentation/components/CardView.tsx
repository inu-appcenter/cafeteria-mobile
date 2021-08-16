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

import {Platform, StyleSheet, TouchableWithoutFeedbackProps, View, ViewStyle} from 'react-native';
import React from 'react';
import colors from '../res/colors';
import Touchable from './Touchable';

interface Props extends TouchableWithoutFeedbackProps {
  style?: ViewStyle;
  children?: React.ReactNode;
  touchable?: boolean;
}

export default class CardView extends React.Component<Props> {
  render() {
    const {style, children, onPress, onLongPress} = this.props;

    const card = <View style={[styles.card, style]}>{children}</View>;

    if (onPress === undefined) {
      return card;
    } else {
      return (
        <Touchable
          style={styles.fullSizedWrapper}
          onPress={e => onPress?.call(undefined, e)}
          onLongPress={e => onLongPress?.call(undefined, e)}>
          {card}
        </Touchable>
      );
    }
  }
}

const styles = StyleSheet.create({
  fullSizedWrapper: {
    width: '100%',
  },

  card: {
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    shadowColor: 'black',
    borderRadius: 12,
    backgroundColor: colors.white,

    // iOS
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 6,
    shadowOpacity: 0.2,

    // Android
    elevation: 8,
  },
});

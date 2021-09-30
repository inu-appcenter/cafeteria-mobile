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
import {Animated, TouchableWithoutFeedbackProps} from 'react-native';
import React, {useState} from 'react';
import Touchable from './Touchable';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../res/colors';

type Props = TouchableWithoutFeedbackProps;

export default function SpinningRefreshButton({onPress, onLongPress}: Props) {
  const [rotateAnimation] = useState(new Animated.Value(0));

  const handleAnimation = () => {
    Animated.timing(rotateAnimation, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      rotateAnimation.setValue(0);
    });
  };

  const interpolateRotating = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const animatedStyle = {
    transform: [
      {
        rotate: interpolateRotating,
      },
    ],
  };

  return (
    <Touchable
      onPress={event => {
        handleAnimation();
        onPress ? onPress(event) : undefined;
      }}
      onLongPress={onLongPress}>
      <Animated.View style={animatedStyle}>
        <Icon name={'refresh'} size={27} style={{padding: 0}} color={colors.textSecondary} />
      </Animated.View>
    </Touchable>
  );
}

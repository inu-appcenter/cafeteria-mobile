import React from 'react';
import {ViewProps} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type Props = ViewProps & {
  reversed?: boolean;
};

export default function VerticalShadow({style, reversed}: Props) {
  const colors = reversed
    ? ['#00000000', '#0000000D']
    : ['#0000000D', '#00000000'];

  return (
    <LinearGradient
      style={[{height: 4, width: '100%'}, style]}
      colors={colors}
    />
  );
}

import React from 'react';
import {View} from 'react-native';
import colors from '../res/colors';
import palette from '../res/palette';
import {ActivityIndicator} from 'react-native-paper';

export default function LoadingView() {
  return (
    <View style={[palette.centeringContainer, palette.whiteBackground]}>
      <ActivityIndicator size={32} color={colors.mainTint} />
    </View>
  );
}

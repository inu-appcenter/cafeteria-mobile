import React from 'react';
import palette from '../../../res/palette';
import PackageInfo from '../../../../common/PackageInfo';
import {Text, View} from 'react-native';

export default function Version() {
  return (
    <View style={[palette.centeringContainer, palette.whiteBackground]}>
      <Text style={palette.textPrimary}>앱 버전: {PackageInfo.version}</Text>
    </View>
  );
}

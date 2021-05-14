import React from 'react';
import colors from '../../res/colors';
import palette from '../../res/palette';
import BackIcon from '../BackIcon';
import {Platform} from 'react-native';
import {TransitionPresets} from '@react-navigation/stack';
import {StackHeaderOptions} from '@react-navigation/stack/lib/typescript/src/types';

const commonStackHeaderOptions: StackHeaderOptions = {
  headerBackTitleVisible: false,
  headerTitleStyle: palette.boldText,
  headerTintColor: colors.textPrimary,
  headerLeftContainerStyle: {
    left: Platform.OS === 'ios' ? 12 : 0,
  },
  headerBackImage: () => <BackIcon />,
  ...TransitionPresets.SlideFromRightIOS,
};

const commonModalHeaderOptions: StackHeaderOptions = {
  headerBackTitleVisible: false,
  headerTitleStyle: palette.boldText,
  headerTintColor: colors.textPrimary,
  headerLeftContainerStyle: {
    left: Platform.OS === 'ios' ? 12 : 0,
  },
  headerBackImage: () => <BackIcon />,
};

export default {
  commonStackHeaderOptions,
  commonModalHeaderOptions,
};

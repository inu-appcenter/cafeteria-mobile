import Icon from 'react-native-vector-icons/MaterialIcons';
import palette from '../../../res/palette';
import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {CafeteriaListDetailNavigationParams} from '../CafeteriaScreen';

type Props = {
  navigation: StackNavigationProp<
    CafeteriaListDetailNavigationParams,
    'Reorder'
  >;
};

export default function ReorderHeaderButton({navigation}: Props) {
  return (
    <Icon
      name="sort"
      size={24}
      style={palette.iconHeaderButton}
      onPress={() => {
        navigation.navigate('Reorder');
      }}
    />
  );
}

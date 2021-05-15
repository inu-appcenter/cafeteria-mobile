import React from 'react';
import Pager from './Pager';
import {View} from 'react-native';
import Header from './Header';
import CafeteriaView from '../CafeteriaView';
import {StackNavigationProp} from '@react-navigation/stack';
import {CafeteriaListDetailNavigationParams} from '../CafeteriaScreen';

type Props = {
  navigation: StackNavigationProp<CafeteriaListDetailNavigationParams, 'List'>;
  cafeteria: CafeteriaView;
};

export default function Section({navigation, cafeteria}: Props) {
  return (
    <View>
      <Header
        title={cafeteria.title}
        onClickMore={() =>
          navigation.navigate('Detail', {cafeteria: cafeteria})
        }
      />

      <Pager menus={cafeteria.menus} stackSize={3} />
    </View>
  );
}

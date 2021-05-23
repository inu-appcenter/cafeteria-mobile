import Pager from '../List/Section/Pager';
import React, {useEffect} from 'react';
import palette from '../../../res/palette';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ScrollView, StyleSheet} from 'react-native';
import {CafeteriaListDetailNavigationParams} from '../CafeteriaScreen';

type Props = {
  route: RouteProp<CafeteriaListDetailNavigationParams, 'CafeteriaDetail'>;
  navigation: StackNavigationProp<
    CafeteriaListDetailNavigationParams,
    'CafeteriaDetail'
  >;
};

export default function Detail({route, navigation}: Props) {
  const {cafeteria} = route.params;

  useEffect(() => {
    navigation.setOptions({headerTitle: cafeteria.title});
  });

  return (
    <ScrollView
      style={palette.whiteBackground}
      contentContainerStyle={styles.detailContentContainer}>
      <Pager menus={cafeteria.menus} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  detailContentContainer: {
    paddingTop: 8,
  },
});

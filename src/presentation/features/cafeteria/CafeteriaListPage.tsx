import palette from '../../res/palette';
import Section from './Section';
import {observer} from 'mobx-react';
import useStores from '../../hooks/useStores';
import {RouteProp} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {Animated, StyleSheet} from 'react-native';
import {MaterialTopTabNavigationProp} from '@react-navigation/material-top-tabs';
import {CafeteriaDateTabNavigationParams} from './CafeteriaListScreen';
import {CafeteriaListDetailNavigationParams} from './CafeteriaScreen';

type Props = {
  route: RouteProp<CafeteriaDateTabNavigationParams, 'DateTab1'>;
  navigation: MaterialTopTabNavigationProp<
    CafeteriaDateTabNavigationParams,
    'DateTab1'
  >;
};

function CafeteriaListPage({route, navigation}: Props) {
  const {dateOffset} = route.params;
  const {cafeteriaStore} = useStores();

  useEffect(() => {
    cafeteriaStore.fetch(dateOffset);
  }, []);

  const parentNavigation = navigation as unknown as StackNavigationProp<
    CafeteriaListDetailNavigationParams,
    'List'
  >;

  return (
    <Animated.FlatList
      style={palette.whiteBackground}
      data={cafeteriaStore.cafeteria.get(dateOffset)}
      renderItem={item => (
        <Section navigation={parentNavigation} cafeteria={item.item} />
      )}
      keyExtractor={i => i.title}
      contentContainerStyle={styles.rootListContentContainer}
    />
  );
}

export default observer(CafeteriaListPage);

const styles = StyleSheet.create({
  rootListContentContainer: {
    paddingBottom: 25,
  },
});

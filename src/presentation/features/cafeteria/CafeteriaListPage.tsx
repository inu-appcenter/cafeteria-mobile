import React from 'react';
import palette from '../../res/palette';
import Section from './Section';
import RootStore from '../../../store/RootStore';
import {RouteProp} from '@react-navigation/native';
import CafeteriaStore from './CafeteriaStore';
import {inject, observer} from 'mobx-react';
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
  store: CafeteriaStore;
};

@inject(({cafeteriaStore}: RootStore) => ({store: cafeteriaStore}))
@observer
export default class CafeteriaListPage extends React.Component<Props> {
  componentDidMount() {
    const {route, store} = this.props;
    const {dateOffset} = route.params;

    store.fetch(dateOffset);
  }

  render() {
    const {route, navigation, store} = this.props;
    const {dateOffset} = route.params;

    const parentNavigation = navigation as unknown as StackNavigationProp<
      CafeteriaListDetailNavigationParams,
      'List'
    >;

    return (
      <Animated.FlatList
        style={palette.whiteBackground}
        data={store.cafeteria.get(dateOffset)}
        renderItem={item => (
          <Section navigation={parentNavigation} cafeteria={item.item} />
        )}
        keyExtractor={i => i.title}
        contentContainerStyle={styles.rootListContentContainer}
      />
    );
  }
}

const styles = StyleSheet.create({
  rootListContentContainer: {
    // Padding at the bottom of the list.
    paddingBottom: 25,
  },
});

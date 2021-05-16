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
import EmptyView from './EmptyView';
import useApi from './useApi';
import handleApiError from '../../../common/utils/handleApiError';

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

  const [loading, fetch] = useApi(() => cafeteriaStore.fetch(dateOffset));

  useEffect(() => {
    fetch().catch(e => handleApiError(e));
  }, []);

  const parentNavigation = navigation as unknown as StackNavigationProp<
    CafeteriaListDetailNavigationParams,
    'List'
  >;

  const cafeteriaList = (
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

  const emptyView = (
    <EmptyView
      whatWentWrong={'절대 생기면 안 되는 문제가 발생했습니다!'}
      showBorder={false}
    />
  );

  return (cafeteriaStore.cafeteria.get(dateOffset)?.length || 0) > 0
    ? cafeteriaList
    : emptyView;
}

export default observer(CafeteriaListPage);

const styles = StyleSheet.create({
  rootListContentContainer: {
    paddingBottom: 25,
  },
});

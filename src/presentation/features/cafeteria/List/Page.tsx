import useApi from '../../../hooks/useApi';
import Section from './Section';
import palette from '../../../res/palette';
import useStores from '../../../hooks/useStores';
import EmptyView from '../../../components/EmptyView';
import {observer} from 'mobx-react';
import {RouteProp} from '@react-navigation/native';
import LoadingView from '../../../components/LoadingView';
import handleApiError from '../../../../common/utils/handleApiError';
import React, {useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {Animated, StyleSheet} from 'react-native';
import {MaterialTopTabNavigationProp} from '@react-navigation/material-top-tabs';
import {CafeteriaDateTabNavigationParams} from './';
import {CafeteriaListDetailNavigationParams} from '../CafeteriaScreen';

type Props = {
  route: RouteProp<CafeteriaDateTabNavigationParams, 'DateTab1'>;
  navigation: MaterialTopTabNavigationProp<
    CafeteriaDateTabNavigationParams,
    'DateTab1'
  >;
};

function Page({route, navigation}: Props) {
  const {dateOffset} = route.params;
  const {cafeteriaStore} = useStores();
  const data = cafeteriaStore.getCafeteriaWithMenus(dateOffset);

  const [loading, invoke] = useApi(() =>
    cafeteriaStore.fetchCafeteriaWithMenusPerDay(dateOffset),
  );

  const fetch = () => invoke().catch(handleApiError);

  useEffect(() => {
    fetch();
  }, []);

  const parentNavigation = navigation as unknown as StackNavigationProp<
    CafeteriaListDetailNavigationParams,
    'CafeteriaList'
  >;

  const loadingView = <LoadingView />;

  const emptyView = (
    <EmptyView
      whatWentWrong={'서버로부터 식당 목록을 가져오지 못했습니다!'}
      showBorder={false}
      retry={() => fetch()}
    />
  );

  const contentsView = (
    <Animated.FlatList
      style={palette.whiteBackground}
      data={data}
      renderItem={item => (
        <Section navigation={parentNavigation} cafeteria={item.item} />
      )}
      keyExtractor={i => i.title}
      contentContainerStyle={styles.rootListContentContainer}
    />
  );

  const contentEmpty = (data?.length || 0) === 0;

  if (loading) {
    return loadingView;
  } else if (contentEmpty) {
    return emptyView;
  } else {
    return contentsView;
  }
}

export default observer(Page);

const styles = StyleSheet.create({
  rootListContentContainer: {
    paddingBottom: 25,
  },
});

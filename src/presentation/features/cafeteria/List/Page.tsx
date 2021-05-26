/**
 * This file is part of INU Cafeteria.
 *
 * Copyright (C) 2021 INU Global App Center <potados99@gmail.com>
 *
 * INU Cafeteria is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * INU Cafeteria is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
      retry={fetch}
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

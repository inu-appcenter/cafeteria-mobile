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

import React from 'react';
import Carousel from '../../../../components/Carousel';
import MenuView from '../../MenuView';
import MenuCard from './MenuCard';
import SomethingWentWrongView from '../../../../components/SomethingWentWrongView';
import {StyleSheet} from 'react-native';
import {divideArray} from '../../../../../common/utils/Array';

type Props = {
  menus: MenuView[];
  stackSize?: number;
};

export default function Pager({menus, stackSize}: Props) {
  const horizontalPager = (
    <Carousel
      gap={6}
      data={divideArray(menus, stackSize)}
      style={styles.sectionCarousel}
      bounces={stackSize !== undefined}
      itemWidth={'88%'}
      renderItem={i => <MenuCard menus={i.item} />}
      keyExtractor={i => i[0].key}
      contentContainerStyle={styles.sectionCarouselContentContainer}
    />
  );

  const emptyView = (
    <SomethingWentWrongView
      whatWentWrong={'식당 정보는 있는데 메뉴를 불러오지는 못했습니다 ㅠ'}
      showBorder={true}
    />
  );

  return menus.length > 0 ? horizontalPager : emptyView;
}

const styles = StyleSheet.create({
  sectionCarousel: {
    overflow: 'visible',
  },

  sectionCarouselContentContainer: {
    // For android: prevent elevation shadow clipping.
    paddingTop: 12,
    paddingBottom: 16,
  },
});

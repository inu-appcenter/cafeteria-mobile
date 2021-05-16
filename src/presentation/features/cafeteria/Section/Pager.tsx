import React from 'react';
import Carousel from '../../../components/Carousel';
import MenuView from '../MenuView';
import MenuCard from './MenuCard';
import EmptyView from '../EmptyView';
import {StyleSheet} from 'react-native';
import {divideArray} from '../../../../common/utils/Array';

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
    <EmptyView
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

import React from 'react';
import Carousel from '../../components/Carousel';
import CardView from '../../components/CardView';
import {divideArray} from '../../../common/utils/Array';
import ItemSeparator from '../../components/ItemSeparator';
import {FlatList, StyleSheet} from 'react-native';
import MenuView from './MenuView';
import MenuItem from './MenuItem';

export default class MenuStackPager extends React.Component<{
  menus: MenuView[];
  stackSize?: number;
}> {
  render() {
    const {menus, stackSize} = this.props;

    return (
      <Carousel
        gap={6}
        bounces={stackSize !== undefined}
        data={divideArray(menus, stackSize)}
        style={styles.sectionCarousel}
        itemWidth={'88%'}
        renderItem={i => <ProfileStackCard menus={i.item} />}
        keyExtractor={i => i[0].cornerName}
        contentContainerStyle={styles.sectionCarouselContentContainer}
      />
    );
  }
}

class ProfileStackCard extends React.Component<{
  menus: MenuView[];
}> {
  render() {
    const {menus} = this.props;

    return (
      <CardView>
        <FlatList
          bounces={false}
          data={menus}
          listKey={menus[0].cornerName}
          renderItem={i => <MenuItem menu={i.item} />}
          keyExtractor={i => i.cornerName}
          ItemSeparatorComponent={ItemSeparator}
        />
      </CardView>
    );
  }
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

import React from 'react';
import palette from '../../res/palette';
import SectionHeader from './SectionHeader';
import MenuStackPager from './MenuStackPager';
import {StackNavigationProp} from '@react-navigation/stack';
import {CafeteriaNavigationParams} from './CafeteriaScreen';
import {Animated, StyleSheet, View} from 'react-native';
import CafeteriaDummyData from './CafeteriaDummyData';
import CafeteriaView from './CafeteriaView';

type Props = {
  navigation: StackNavigationProp<CafeteriaNavigationParams, 'List'>;
};

export default class CafeteriaListPage extends React.Component<Props> {
  render() {
    const {navigation} = this.props;

    return (
      <Animated.FlatList
        style={palette.whiteBackground}
        data={CafeteriaDummyData}
        renderItem={item => (
          <CafeteriaSection navigation={navigation} cafeteria={item.item} />
        )}
        keyExtractor={i => i.title}
        contentContainerStyle={styles.rootListContentContainer}
      />
    );
  }
}

class CafeteriaSection extends React.Component<
  Props & {cafeteria: CafeteriaView}
> {
  render() {
    const {navigation, cafeteria} = this.props;

    return (
      <View>
        <SectionHeader
          title={cafeteria.title}
          onClickMore={() =>
            navigation.navigate('Detail', {cafeteria: cafeteria})
          }
        />

        <MenuStackPager menus={cafeteria.menus} stackSize={3} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rootListContentContainer: {
    paddingBottom: 25, // Padding at the bottom of the list.
  },
});

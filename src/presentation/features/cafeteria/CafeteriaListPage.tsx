import React from 'react';
import palette from '../../res/palette';
import SectionHeader from './SectionHeader';
import CornerStackPager from './CornerStackPager';
import {StackNavigationProp} from '@react-navigation/stack';
import {CafeteriaNavigationParams} from './CafeteriaScreen';
import {Animated, StyleSheet, View} from 'react-native';
import {exampleListItems, GithubProfileSectionItem} from './GitHubProfileData';

type Props = {
  navigation: StackNavigationProp<CafeteriaNavigationParams, 'List'>;
};

export default class CafeteriaListPage extends React.Component<Props> {
  render() {
    const {navigation} = this.props;

    return (
      <Animated.FlatList
        style={palette.whiteBackground}
        data={exampleListItems}
        renderItem={item => (
          <SectionItem navigation={navigation} section={item.item} />
        )}
        keyExtractor={i => i.title}
        contentContainerStyle={styles.rootListContentContainer}
      />
    );
  }
}

class SectionItem extends React.Component<
  Props & {section: GithubProfileSectionItem}
> {
  render() {
    const {navigation, section} = this.props;

    return (
      <View>
        <SectionHeader
          title={section.title}
          onClickMore={() => navigation.navigate('Detail', {section})}
        />

        <CornerStackPager profiles={section.profiles} stackSize={3} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rootListContentContainer: {
    paddingBottom: 25, // Padding at the bottom of the list.
  },
});

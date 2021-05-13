import React from 'react';
import {GithubProfileItem} from './GitHubProfileData';
import Carousel from '../../components/Carousel';
import {divideArray} from '../../../common/utils/Array';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import CardView from '../../components/CardView';
import ItemSeparator from '../../components/ItemSeparator';
import Touchable from '../../components/Touchable';

export default class CornerStackPager extends React.Component<{
  profiles: GithubProfileItem[];
  stackSize?: number;
}> {
  render() {
    const {profiles, stackSize} = this.props;

    return (
      <Carousel
        gap={6}
        bounces={stackSize !== undefined}
        data={divideArray(profiles, stackSize)}
        style={styles.sectionCarousel}
        itemWidth={'88%'}
        renderItem={i => <ProfileStackCard profiles={i.item} />}
        keyExtractor={i => i[0].userId}
        contentContainerStyle={styles.sectionCarouselContentContainer}
      />
    );
  }
}

class ProfileStackCard extends React.Component<{
  profiles: GithubProfileItem[];
}> {
  render() {
    const {profiles} = this.props;

    return (
      <CardView>
        <FlatList
          bounces={false}
          data={profiles}
          listKey={profiles[0].userId}
          renderItem={i => <ProfileItem profile={i.item} />}
          keyExtractor={i => i.userId}
          ItemSeparatorComponent={ItemSeparator}
        />
      </CardView>
    );
  }
}

class ProfileItem extends React.Component<
  {profile: GithubProfileItem},
  {lines: number}
> {
  state = {
    lines: 1,
  };

  render() {
    const {profile} = this.props;
    const {lines} = this.state;
    const setMaxLines = (max: number) => {
      this.setState({
        lines: max,
      });
    };

    return (
      <Touchable onPress={() => setMaxLines(5)}>
        <View style={styles.profileItemWrapper}>
          <Text
            numberOfLines={lines}
            ellipsizeMode={'tail'}
            style={styles.profileItemText}>
            {`Profile of ${profile.userId}! Perform a long click to see what's next! Maybe this text will be ellipsized due to its too much length ;)`}
          </Text>
        </View>
      </Touchable>
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

  profileItemWrapper: {
    padding: 20,
  },

  profileItemText: {
    fontSize: 18,
  },
});

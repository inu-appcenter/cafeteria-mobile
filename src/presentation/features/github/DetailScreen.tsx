import React from 'react';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ScrollView, StyleSheet} from 'react-native';
import {GithubProfileParamList} from './GithubScreen';
import ProfileStackPager from './ProfileStackPager';
import palette from '../../res/palette';

type Props = {
  route: RouteProp<GithubProfileParamList, 'Detail'>;
  navigation: StackNavigationProp<GithubProfileParamList, 'Detail'>;
};

export default class DetailScreen extends React.Component<Props> {
  render() {
    const {route} = this.props;
    const {section} = route.params;

    return (
      <ScrollView
        style={palette.whiteBackground}
        contentContainerStyle={styles.detailContentContainer}>
        <ProfileStackPager profiles={section.profiles} />
      </ScrollView>
    );
  }

  componentDidMount() {
    const {route, navigation} = this.props;
    const {section} = route.params;

    navigation.setOptions({headerTitle: section.title});
  }
}

const styles = StyleSheet.create({
  detailContentContainer: {
    paddingTop: 8,
  },
});

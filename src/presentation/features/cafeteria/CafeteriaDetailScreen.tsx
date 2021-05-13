import React from 'react';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ScrollView, StyleSheet} from 'react-native';
import {CafeteriaNavigationParams} from './CafeteriaScreen';
import CornerStackPager from './CornerStackPager';
import palette from '../../res/palette';

type Props = {
  route: RouteProp<CafeteriaNavigationParams, 'Detail'>;
  navigation: StackNavigationProp<CafeteriaNavigationParams, 'Detail'>;
};

export default class CafeteriaDetailScreen extends React.Component<Props> {
  render() {
    const {route} = this.props;
    const {section} = route.params;

    return (
      <ScrollView
        style={palette.whiteBackground}
        contentContainerStyle={styles.detailContentContainer}>
        <CornerStackPager profiles={section.profiles} />
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

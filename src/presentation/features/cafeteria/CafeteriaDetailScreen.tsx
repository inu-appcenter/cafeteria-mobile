import Pager from './Section/Pager';
import React from 'react';
import palette from '../../res/palette';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ScrollView, StyleSheet} from 'react-native';
import {CafeteriaListDetailNavigationParams} from './CafeteriaScreen';

type Props = {
  route: RouteProp<CafeteriaListDetailNavigationParams, 'Detail'>;
  navigation: StackNavigationProp<
    CafeteriaListDetailNavigationParams,
    'Detail'
  >;
};

export default class CafeteriaDetailScreen extends React.Component<Props> {
  render() {
    const {route} = this.props;
    const {cafeteria} = route.params;

    return (
      <ScrollView
        style={palette.whiteBackground}
        contentContainerStyle={styles.detailContentContainer}>
        <Pager menus={cafeteria.menus} />
      </ScrollView>
    );
  }

  componentDidMount() {
    const {route, navigation} = this.props;
    const {cafeteria} = route.params;

    navigation.setOptions({headerTitle: cafeteria.title});
  }
}

const styles = StyleSheet.create({
  detailContentContainer: {
    paddingTop: 8,
  },
});

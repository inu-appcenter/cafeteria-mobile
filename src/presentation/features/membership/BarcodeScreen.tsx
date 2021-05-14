import React from 'react';
import {Text, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MembershipNavigationParams} from './MembershipScreen';

type Props = {
  navigation: StackNavigationProp<MembershipNavigationParams, 'Barcode'>;
};

export default class BarcodeScreen extends React.Component<Props> {
  render() {
    const {navigation} = this.props;

    return (
      <View>
        <Text>adadadadadd</Text>
      </View>
    );
  }
}

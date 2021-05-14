import React from 'react';
import {Button, Text, View} from 'react-native';
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
        <View>
          <Text>학생 할인 멤버십</Text>
          <Text>
            재학생을 위한 할인 혜택을 제공합니다. 로그인하시고 이용해 보세요 :)
          </Text>
          <Button title="로그인" onPress={() => navigation.navigate('Login')} />
        </View>
      </View>
    );
  }
}

import React from 'react';
import palette from '../../res/palette';
import ShowContactsButton from './ShowContactsButton';
import {StackNavigationProp} from '@react-navigation/stack';
import {SupportNavigationParams} from './SupportScreen';
import {ScrollView, StyleSheet, View} from 'react-native';

type Props = {
  navigation: StackNavigationProp<SupportNavigationParams, 'SupportMain'>;
};

export default function SupportMainScreen({navigation}: Props) {
  return (
    <ScrollView style={palette.whiteBackground}>
      <View style={styles.container}>
        <ShowContactsButton navigation={navigation} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

import React from 'react';
import CardView from '../../components/CardView';
import {ScrollView, Text, View} from 'react-native';

export default function BarcodeScreen() {
  return (
    <ScrollView>
      <CardView
        style={{padding: 12, margin: 21, flex: 1, flexDirection: 'column'}}>
        <View>
          <Text>/* header */</Text>
        </View>
        <View>
          <Text>/* logo and top/bottom shadow divider */</Text>
        </View>
        <View>
          <Text>/* user info part */</Text>
        </View>
        <View>
          <Text>/* barcode part */</Text>
        </View>
      </CardView>
    </ScrollView>
  );
}

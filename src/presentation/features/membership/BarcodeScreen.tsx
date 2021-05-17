import React from 'react';
import CardView from '../../components/CardView';
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import palette from '../../res/palette';
import VerticalShadow from '../../components/VerticalShadow';
import colors from '../../res/colors';
import Barcode from 'react-native-barcode-builder';

export default function BarcodeScreen() {
  const userId = '201701562';
  const barcodeValue = '1210209372';
  const barcodeWidth = Dimensions.get('window').width / 140;

  const header = (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 12,
      }}>
      <Image
        resizeMode="contain"
        style={{height: 30, width: 140}}
        source={require('../../res/images/uicoop_logo.png')}
      />
      <Text style={[palette.textPrimary, palette.boldText]}>
        소비자생활협동조합
      </Text>
    </View>
  );

  const logoImage = (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <VerticalShadow />
      <View
        style={{
          paddingVertical: 60,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{
            height: 16,
          }}
          resizeMode="contain"
          source={require('../../res/images/header_logo.png')}
        />
      </View>
      <VerticalShadow reversed />
    </View>
  );

  const userInfo = (
    <View style={{padding: 16}}>
      <Text
        style={{
          color: colors.textPrimary,
          fontSize: 14,
          fontWeight: 'bold',
        }}>
        학번
      </Text>
      <Text
        style={{
          ...palette.lightText,
          color: colors.textPrimary,
          fontSize: 24,
          marginTop: Platform.OS === 'android' ? 0 : 6,
        }}>
        {userId}
      </Text>
    </View>
  );

  const barcodeImage = (
    <View style={{padding: 10}}>
      <Barcode
        text={barcodeValue}
        value={barcodeValue}
        width={barcodeWidth}
        height={99}
        format="CODE128"
      />
    </View>
  );

  return (
    <ScrollView>
      <CardView
        onPress={() => {}}
        style={{margin: 21, flex: 1, flexDirection: 'column'}}>
        {header}
        {logoImage}
        {userInfo}
        {barcodeImage}
      </CardView>
    </ScrollView>
  );
}

import {
  Text,
  View,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import colors from '../../res/colors';
import palette from '../../res/palette';
import Barcode from 'react-native-barcode-builder';
import CardView from '../../components/CardView';
import useUserState from '../../hooks/useUserState';
import VerticalShadow from '../../components/VerticalShadow';

export default function BarcodeScreen() {
  const {userId, barcode} = useUserState();

  if (userId === undefined || barcode === undefined) {
    console.error(
      '멤버십 바코드 화면을 렌더링하는 데에 필요한 사용자 정보가 없네요!',
    );
    return null;
  }

  const header = (
    <View style={styles.header}>
      <Image
        style={styles.headerUiCoopLogo}
        source={require('../../res/images/uicoop_logo.png')}
        resizeMode="contain"
      />
      <Text style={[palette.textPrimary, palette.boldText]}>
        소비자생활협동조합
      </Text>
    </View>
  );

  const logoImage = (
    <View style={styles.logoImage}>
      <VerticalShadow />
      <View style={styles.logoImageInternalContainer}>
        <Image
          style={styles.logoImageContent}
          source={require('../../res/images/header_logo.png')}
          resizeMode="contain"
        />
      </View>
      <VerticalShadow reversed />
    </View>
  );

  const userInfo = (
    <View style={{padding: 16}}>
      <Text style={styles.userInfoIdLabel}>학번</Text>
      <Text style={styles.userInfoIdValue}>{userId}</Text>
    </View>
  );

  const barcodeWidth = Dimensions.get('window').width / 140;

  const barcodeImage = (
    <View style={{padding: 10}}>
      <Barcode
        text={barcode}
        value={barcode}
        width={barcodeWidth}
        height={99}
        format="CODE128"
      />
    </View>
  );

  return (
    <ScrollView style={palette.whiteBackground}>
      <CardView onPress={() => {}} style={styles.cardViewContainer}>
        {header}
        {logoImage}
        {userInfo}
        {barcodeImage}
      </CardView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardViewContainer: {
    margin: 21,
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  headerUiCoopLogo: {
    width: 140,
    height: 30,
  },
  logoImage: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  logoImageInternalContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  logoImageContent: {
    height: 16,
  },
  userInfoIdLabel: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  userInfoIdValue: {
    ...palette.lightText,
    color: colors.textPrimary,
    fontSize: 24,
    marginTop: Platform.OS === 'android' ? 0 : 6,
  },
});

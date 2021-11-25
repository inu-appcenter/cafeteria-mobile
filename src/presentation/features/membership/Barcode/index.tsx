/**
 * This file is part of INU Cafeteria.
 *
 * Copyright (C) 2021 INU Global App Center <potados99@gmail.com>
 *
 * INU Cafeteria is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * INU Cafeteria is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import useApi from '../../../hooks/useApi';
import colors from '../../../res/colors';
import palette from '../../../res/palette';
import CardView from '../../../components/CardView';
import {observer} from 'mobx-react';
import useInterval from '../../../hooks/useInterval';
import useUserState from '../../../hooks/useUserState';
import handleApiError from '../../../../common/utils/handleApiError';
import BarcodeBuilder from 'react-native-barcode-builder';
import VerticalShadow from '../../../components/VerticalShadow';
import ActivateBarcode from '../../../../domain/usecases/ActivateBarcode';
import React, {useEffect} from 'react';
import useScreenBrightness from '../../../hooks/useScreenBrightness';
import {Dimensions, Image, Platform, ScrollView, StyleSheet, Text, View} from 'react-native';

function Barcode() {
  const {barcode, studentId} = useUserState();

  const [toggleBrightness] = useScreenBrightness();
  const [, activateBarcode] = useApi(() => ActivateBarcode.run());

  useEffect(() => {
    activateBarcode().catch(handleApiError);
  }, []);

  useInterval(() => {
    activateBarcode().catch();
  }, 1000 * 60 * 5 /* 5분에 한번씩 */);

  const header = (
    <View style={styles.header}>
      <Image
        style={styles.headerUiCoopLogo}
        source={require('../../../res/images/uicoop_logo.png')}
        resizeMode="contain"
      />
      <Text style={[palette.textPrimary, palette.boldText]}>소비자생활협동조합</Text>
    </View>
  );

  const logoImage = (
    <View style={styles.logoImage}>
      <VerticalShadow />
      <View style={styles.logoImageInternalContainer}>
        <Image
          style={styles.logoImageContent}
          source={require('../../../res/images/header_logo.png')}
          resizeMode="contain"
        />
      </View>
      <VerticalShadow reversed />
    </View>
  );

  const userInfo = (
    <View style={{padding: 16}}>
      <Text style={styles.userInfoIdLabel}>학번</Text>
      <Text style={styles.userInfoIdValue}>{studentId}</Text>
    </View>
  );

  const barcodeWidth = Dimensions.get('window').width / 140;

  const barcodeImage = (
    <View style={{padding: 10}}>
      <BarcodeBuilder
        text={barcode}
        value={barcode || 'invalid'}
        width={barcodeWidth}
        height={99}
        format="CODE128"
      />
    </View>
  );

  return (
    <ScrollView style={palette.whiteBackground}>
      <CardView onPress={toggleBrightness} style={styles.cardViewContainer}>
        {header}
        {logoImage}
        {userInfo}
        {barcodeImage}
      </CardView>
      <Text style={styles.footerText}>• 바코드를 클릭하면 밝아집니다.</Text>
      <Text style={styles.footerText}>• 바코드는 앱이 켜져 있는 동안에만 사용하실 수 있습니다.</Text>
      <Text style={styles.footerText}>• 같은 식당에서는 하루에 한 번만 할인받으실 수 있습니다.</Text>
    </ScrollView>
  );
}

export default observer(Barcode);

const styles = StyleSheet.create({
  cardViewContainer: {
    margin: 22,
    borderRadius: 18,
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
    height: 27,
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
  footerText: {
    ...palette.textTertiary,
    marginHorizontal: 24,
  },
});

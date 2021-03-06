/**
 * This file is part of INU Cafeteria.
 *
 * Copyright 2021 INU Global App Center <potados99@gmail.com>
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
import palette from '../../../res/palette';
import {Button} from 'react-native-paper';
import useStores from '../../../hooks/useStores';
import PaperPresets from '../../../components/utils/PaperPresets';
import ConfettiCannon from 'react-native-confetti-cannon';
import handleApiError from '../../../../common/utils/handleApiError';
import {StackNavigationProp} from '@react-navigation/stack';
import {BookingNavigationParams} from '../BookingScreen';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';

type Props = {
  navigation: StackNavigationProp<BookingNavigationParams, 'BookingComplete'>;
};

export default function Complete({navigation}: Props) {
  const {width} = useWindowDimensions();
  const {bookingStore} = useStores();

  const [_, fetch] = useApi(() => bookingStore.fetchMyBookings());
  const [confettiVisible, setConfettiVisible] = useState(false);

  const triggerHapticEffect = () => {
    setTimeout(() => {
      ReactNativeHapticFeedback.trigger('notificationSuccess', {
        enableVibrateFallback: false,
        ignoreAndroidSystemSettings: false,
      });
    }, 200);
  };

  useEffect(() => {
    triggerHapticEffect();
    setConfettiVisible(true);

    fetch().catch(handleApiError);
  }, []);

  const confetti = (
    <ConfettiCannon count={200} explosionSpeed={800} fallSpeed={2000} origin={{x: width / 2, y: -10}} />
  );

  return (
    <View style={[palette.whiteFullSized, palette.centeringContainer]}>
      <Text style={styles.bigEmojiText}>???</Text>
      <Text style={styles.mainTitleText}>????????? ?????????????????????.</Text>

      <Button
        {...PaperPresets.wideThemedButton}
        style={palette.bottomButton}
        onPress={() => navigation.navigate('BookingHistory')}>
        ????????????
      </Button>

      {confettiVisible && confetti}
    </View>
  );
}

const styles = StyleSheet.create({
  bigEmojiText: {
    fontSize: 42,
  },
  mainTitleText: {
    ...palette.textSubHeader,
    marginTop: 18,
  },
  backButton: {},
});

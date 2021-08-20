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

import {observer} from 'mobx-react';
import useStores from '../../../hooks/useStores';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {Button} from 'react-native-paper';
import PaperPresets from '../../../components/utils/PaperPresets';
import React from 'react';
import colors from '../../../res/colors';
import palette from '../../../res/palette';
import useApi from '../../../hooks/useApi';
import {StackNavigationProp} from '@react-navigation/stack';
import {BookingNavigationParams} from '../BookingScreen';
import handleApiError from '../../../../common/utils/handleApiError';

type Props = {
  navigation: StackNavigationProp<BookingNavigationParams, 'BookingDetail'>;
};

function ConfirmModal({navigation}: Props) {
  const {bookingStore} = useStores();
  const {bottom} = useSafeAreaInsets();

  const [loading, fetch] = useApi(() => bookingStore.confirmCurrentOption());

  const confirm = async () => {
    fetch()
      .then(() => navigation.navigate('BookingComplete'))
      .catch(e => handleApiError(e));
  };

  const bookingOption = bookingStore.currentOption;
  if (bookingOption == null) {
    return null;
  }

  const computedStyles = StyleSheet.create({
    cancelButtonLabel: {
      color: colors.textSecondary,
      fontSize: 16,
      paddingBottom: bottom,
    },
    confirmButtonLabel: {
      color: 'white',
      fontSize: 16,
      paddingBottom: bottom,
    },
  });

  return (
    <Modal
      isVisible={bookingStore.currentOption != null}
      swipeDirection="down"
      onBackdropPress={() => bookingStore.dismissCurrentOption()}
      onSwipeComplete={() => bookingStore.dismissCurrentOption()}
      style={styles.modal}>
      <View style={styles.modalContentContainer}>
        <View style={styles.upperContainer}>
          <Text style={styles.textTitle}>예약하시겠습니까?</Text>
          <View style={{marginTop: 24}}>
            <Text style={styles.textBody}>
              • 일시: {bookingOption.timeSlotDateString} {bookingOption.timeSlotTimeString}
            </Text>
            <Text style={styles.textBody}>• 장소: {bookingOption.cafeteriaTitle}</Text>
          </View>
          <View style={{marginTop: 32}}>
            <Text style={styles.textSmallBody}>• 예약 시간 전에 취소하실 수 있습니다.</Text>
            <Text style={styles.textSmallBody}>• 같은 날 같은 시간에는 중복으로 예약할 수 없습니다.</Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Button
            {...PaperPresets.wideNeutralButton}
            labelStyle={computedStyles.cancelButtonLabel}
            style={styles.primaryButton}
            onPress={() => bookingStore.dismissCurrentOption()}>
            취소
          </Button>
          <Button
            {...PaperPresets.wideThemedButton}
            labelStyle={computedStyles.confirmButtonLabel}
            style={styles.primaryButton}
            loading={loading}
            onPress={confirm}>
            예약
          </Button>
        </View>
      </View>
    </Modal>
  );
}

export default observer(ConfirmModal);

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContentContainer: {
    width: '100%',
    minHeight: 240,
    backgroundColor: colors.white,
    borderRadius: 20,
    justifyContent: 'space-between',
  },
  upperContainer: {
    paddingHorizontal: 28,
    paddingVertical: 32,
  },
  textTitle: {
    ...palette.textSubHeader,
  },
  textBody: {
    ...palette.textPrimary,
    marginTop: 8,
  },
  textSmallBody: {
    ...palette.textSecondary,
    marginTop: 6,
  },
  primaryButton: {
    flex: 1,
    borderRadius: 0,
    elevation: 0,
  },
});

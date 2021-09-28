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

import Modal from 'react-native-modal';
import React from 'react';
import useApi from '../../../hooks/useApi';
import colors from '../../../res/colors';
import palette from '../../../res/palette';
import {Button} from 'react-native-paper';
import useStores from '../../../hooks/useStores';
import {observer} from 'mobx-react';
import PaperPresets from '../../../components/utils/PaperPresets';
import handleApiError from '../../../../common/utils/handleApiError';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StackNavigationProp} from '@react-navigation/stack';
import {StyleSheet, Text, View} from 'react-native';
import {BookingNavigationParams} from '../BookingScreen';

type Props = {
  navigation: StackNavigationProp<BookingNavigationParams, 'BookingOptionsDetail'>;
};

function ConfirmModal({navigation}: Props) {
  const {bookingStore} = useStores();
  const {bottom} = useSafeAreaInsets();

  const [loading, fetch] = useApi(() => bookingStore.confirmCurrentOption());

  const confirm = async () => {
    fetch()
      .then(() => navigation.navigate('BookingComplete'))
      .catch(handleApiError);
  };

  const bookingOption = bookingStore.currentOption;
  if (bookingOption == null) {
    return null;
  }

  const computedStyles = StyleSheet.create({
    buttonBar: {
      flexDirection: 'row',
      marginHorizontal: 24,
      marginBottom: bottom,
    },
  });

  return (
    <Modal
      style={styles.modal}
      isVisible={bookingStore.currentOption != null}
      swipeDirection="down"
      onBackdropPress={() => bookingStore.dismissCurrentOption()}
      onSwipeComplete={() => bookingStore.dismissCurrentOption()}>
      <View style={styles.modalContentContainer}>
        <View style={styles.upperContainer}>
          <Text style={styles.textTitle}>예약하시겠습니까?</Text>
          <View style={styles.textContainer}>
            <Text style={styles.textBody}>
              • 일시: {bookingOption.timeSlotDateString} {bookingOption.timeSlotTimeString}
            </Text>
            <Text style={styles.textBody}>• 장소: {bookingOption.cafeteriaTitle}</Text>
          </View>
          <View style={styles.smallTextContainer}>
            <Text style={styles.textSmallBody}>• 예약 시간 전에 취소할 수 있습니다.</Text>
            <Text style={styles.textSmallBody}>• 같은 식당에 중복으로 예약할 수 없습니다.</Text>
          </View>
        </View>

        <View style={computedStyles.buttonBar}>
          <Button
            {...PaperPresets.wideNeutralButton}
            style={styles.primaryButton}
            labelStyle={styles.cancelButtonLabel}
            onPress={() => bookingStore.dismissCurrentOption()}>
            취소
          </Button>
          <Button
            {...PaperPresets.wideThemedButton}
            style={styles.primaryButton}
            loading={loading}
            labelStyle={styles.confirmButtonLabel}
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
  textContainer: {
    marginTop: 24,
  },
  textBody: {
    ...palette.textPrimary,
    marginTop: 8,
  },
  smallTextContainer: {
    marginTop: 32,
  },
  textSmallBody: {
    ...palette.textSecondary,
    marginTop: 6,
  },
  primaryButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  cancelButtonLabel: {
    color: colors.textSecondary,
    fontSize: 18,
    paddingVertical: 2,
  },
  confirmButtonLabel: {
    color: 'white',
    fontSize: 18,
    paddingVertical: 2,
  },
});

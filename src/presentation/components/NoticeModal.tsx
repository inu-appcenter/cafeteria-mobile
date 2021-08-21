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
import colors from '../res/colors';
import palette from '../res/palette';
import {Button} from 'react-native-paper';
import useStores from '../hooks/useStores';
import {observer} from 'mobx-react';
import PaperPresets from './utils/PaperPresets';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StyleSheet, Text, View} from 'react-native';

function NoticeModal() {
  const {noticeStore} = useStores();
  const {bottom} = useSafeAreaInsets();

  const computedStyles = StyleSheet.create({
    buttonLabel: {
      color: 'white',
      fontSize: 16,
      paddingBottom: bottom,
    },
  });

  return (
    <Modal
      isVisible={noticeStore.currentNotice != null}
      swipeDirection="down"
      onSwipeComplete={() => noticeStore.dismissCurrentNotice()}
      style={styles.modal}>
      <View style={styles.modalContentContainer}>
        <View style={styles.upperContainer}>
          <Text style={styles.textTitle}>{noticeStore.currentNotice?.title}</Text>
          <Text style={styles.textBody}>{noticeStore.currentNotice?.body}</Text>
        </View>

        <Button
          {...PaperPresets.wideThemedButton}
          labelStyle={computedStyles.buttonLabel}
          style={styles.primaryButton}
          onPress={() => noticeStore.dismissCurrentNotice()}>
          닫기
        </Button>
      </View>
    </Modal>
  );
}

export default observer(NoticeModal);

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
    marginTop: 16,
  },
  primaryButton: {
    borderRadius: 0,
  },
});

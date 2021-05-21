import Modal from 'react-native-modal';
import React from 'react';
import colors from '../../res/colors';
import palette from '../../res/palette';
import {Button} from 'react-native-paper';
import useStores from '../../hooks/useStores';
import {observer} from 'mobx-react';
import PaperPresets from '../../components/utils/PaperPresets';
import {StyleSheet, Text, View} from 'react-native';

function NoticeModal() {
  const {noticeStore} = useStores();

  return (
    <Modal
      isVisible={noticeStore.currentNotice !== undefined}
      swipeDirection="down"
      onSwipeComplete={() => noticeStore.dismissCurrentNotice()}
      style={styles.modal}>
      <View style={styles.modalContentContainer}>
        <View style={styles.upperContainer}>
          <Text style={styles.textTitle}>
            {noticeStore.currentNotice?.title}
          </Text>
          <Text style={styles.textBody}>{noticeStore.currentNotice?.body}</Text>
        </View>

        <Button
          {...PaperPresets.wideThemedButton}
          labelStyle={styles.buttonLabel}
          style={styles.button}
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
  button: {
    borderRadius: 0,
  },
  buttonLabel: {
    color: 'white',
    fontSize: 16,
    paddingBottom: 34,
  },
});

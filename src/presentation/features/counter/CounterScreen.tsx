import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import colors from '../../res/colors';
import palette from '../../res/palette';
import useStores from '../../hooks/useStores';
import {observer} from 'mobx-react';

function CounterScreen() {
  const {counterStore} = useStores();

  return (
    <View style={palette.centeringContainer}>
      <Text style={styles.label}>Counter: {counterStore.counterValue}</Text>

      <TextInput
        onSubmitEditing={event =>
          counterStore.set(Number.parseInt(event.nativeEvent.text, 10))
        }
        style={styles.input}
        placeholderTextColor={colors.textTertiary}
        keyboardType="numeric"
        returnKeyType="done"
        placeholder="change amount"
      />

      <View style={styles.floatingView}>
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => counterStore.increase()}>
          <Text style={palette.textSecondary}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => counterStore.decrease()}>
          <Text style={palette.textSecondary}>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default observer(CounterScreen);

const styles = StyleSheet.create({
  floatingView: {
    position: 'absolute', // 얘만 따로 취급!
    bottom: 10,
    right: 10,
  },
  floatingButton: {
    flexDirection: 'column', // top to bottom
    borderStyle: 'solid',
    borderWidth: 1,
    justifyContent: 'center', // main axis: align vertical
    alignItems: 'center', // cross axis: align horizontal
    aspectRatio: 1,
    width: 55,
    borderRadius: 50,
    margin: 6,
  },
  label: {
    ...palette.textPrimary,
    fontSize: 30,
  },
  input: {
    ...palette.textSecondary,
    fontSize: 20,
    margin: 12,
  },
});

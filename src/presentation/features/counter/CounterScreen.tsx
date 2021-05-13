import React from 'react';
import palette from '../../res/palette';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {inject, observer} from 'mobx-react';
import RootStore from '../../../store/RootStore';
import CounterStore from './CounterStore';
import colors from '../../res/colors';

@inject(({counterStore}: RootStore) => ({store: counterStore}))
@observer
export default class CounterScreen extends React.Component<{
  store: CounterStore;
}> {
  render() {
    const {store} = this.props;

    return (
      <View style={palette.centeringContainer}>
        <Text style={styles.label}>Counter: {store.counterValue}</Text>

        <TextInput
          onSubmitEditing={event =>
            store.set(Number.parseInt(event.nativeEvent.text, 10))
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
            onPress={() => store.increase()}>
            <Text style={palette.textSecondary}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={() => store.decrease()}>
            <Text style={palette.textSecondary}>-</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

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

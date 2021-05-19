import {
  Platform,
  StyleSheet,
  TouchableWithoutFeedbackProps,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import colors from '../res/colors';
import Touchable from './Touchable';

interface Props extends TouchableWithoutFeedbackProps {
  style?: ViewStyle;
  children?: React.ReactNode;
  touchable?: boolean;
}

export default class CardView extends React.Component<Props> {
  render() {
    const {style, children, onPress} = this.props;

    const card = <View style={{...styles.card, ...style}}>{children}</View>;

    if (onPress === undefined) {
      return card;
    } else {
      return (
        <Touchable
          style={styles.fullSizedWrapper}
          onPress={e => onPress?.call(undefined, e)}>
          {card}
        </Touchable>
      );
    }
  }
}

const styles = StyleSheet.create({
  fullSizedWrapper: {
    width: '100%',
  },

  card: {
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    shadowColor: 'black',
    borderRadius: 12,
    backgroundColor: colors.white,

    // iOS
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 6,
    shadowOpacity: 0.2,

    // Android
    elevation: 8,
  },
});

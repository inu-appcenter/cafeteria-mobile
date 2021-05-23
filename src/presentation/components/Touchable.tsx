import React from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedbackProps,
} from 'react-native';
import colors from '../res/colors';

/**
 * Platform optimized touchable item.
 */
export default class Touchable extends React.Component<TouchableWithoutFeedbackProps> {
  render() {
    if (Platform.OS === 'android') {
      const ripple = TouchableNativeFeedback.Ripple(
        colors.rippleColorLight,
        false,
      );

      return (
        <TouchableNativeFeedback
          background={ripple}
          useForeground={true}
          {...this.props}
          style={{}}
        />
      );
    } else {
      return <TouchableOpacity activeOpacity={0.5} {...this.props} />;
    }
  }
}

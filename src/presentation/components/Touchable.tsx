import React from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedbackProps,
} from 'react-native';
import color from '../res/color';

/**
 * Platform optimized touchable item.
 */
export default class Touchable extends React.Component<TouchableWithoutFeedbackProps> {
  render() {
    if (Platform.OS === 'android') {
      const ripple = TouchableNativeFeedback.Ripple(
        color.rippleColorLight,
        false,
      );

      return (
        <TouchableNativeFeedback
          background={ripple}
          useForeground={true}
          {...this.props}
        />
      );
    } else {
      return <TouchableOpacity activeOpacity={0.5} {...this.props} />;
    }
  }
}

import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import color from '../res/color';

export default class BackIcon extends React.Component {
  render() {
    return <Icon name="arrow-left" size={25} color={color.textPrimary} />;
  }
}

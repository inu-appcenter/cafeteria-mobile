import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import colors from '../res/colors';

export default class BackIcon extends React.Component {
  render() {
    return <Icon name="arrow-left" size={25} color={colors.textPrimary} />;
  }
}

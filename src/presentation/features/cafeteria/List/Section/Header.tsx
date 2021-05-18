import {
  Text,
  View,
  ViewProps,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import React from 'react';
import colors from '../../../../res/colors';
import palette from '../../../../res/palette';

type Props = ViewProps & {
  title?: string;
  onClickMore?: () => void;
};

export default function Header({title, onClickMore, style}: Props) {
  return (
    <TouchableOpacity onPress={onClickMore}>
      <View style={[styles.container, style]}>
        <Text style={palette.textHeader}>{title}</Text>
        <Icon name="arrow-right" size={25} color={colors.textPrimary} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 24,
    marginTop: 16,
  },
});

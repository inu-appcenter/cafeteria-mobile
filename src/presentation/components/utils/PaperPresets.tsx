import colors from '../../res/colors';
import {Button, TextInput} from 'react-native-paper';

const commonTextInput: typeof TextInput.defaultProps = {
  mode: 'outlined',
  theme: {
    colors: {
      primary: colors.themeBlue,
      placeholder: colors.textSecondary,
    },
  },
  selectionColor: colors.themeBlue,
};

const wideButton: typeof Button.defaultProps = {
  contentStyle: {
    padding: 6,
  },
  labelStyle: {color: 'white', fontSize: 16},
  color: colors.themeBlue,
  mode: 'contained',
};

export default {
  commonTextInput,
  wideButton,
};

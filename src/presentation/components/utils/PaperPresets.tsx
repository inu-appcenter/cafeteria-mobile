import colors from '../../res/colors';
import {Button, TextInput} from 'react-native-paper';

const commonTextInput: typeof TextInput.defaultProps = {
  mode: 'outlined',
  theme: {
    colors: {
      primary: colors.mainTint,
      placeholder: colors.textSecondary,
    },
  },
  selectionColor: colors.mainTint,
};

const idTextInput: typeof TextInput.defaultProps = {
  ...commonTextInput,
  returnKeyType: 'next',
  keyboardType: 'number-pad',
};

const passwordTextInput: typeof TextInput.defaultProps = {
  ...commonTextInput,
  returnKeyType: 'go',
  secureTextEntry: true,
  clearTextOnFocus: true,
  enablesReturnKeyAutomatically: true,
};

const wideButton: typeof Button.defaultProps = {
  contentStyle: {
    padding: 6,
  },
  mode: 'contained',
};

const wideThemedButton: typeof Button.defaultProps = {
  contentStyle: {
    padding: 6,
  },
  labelStyle: {color: 'white', fontSize: 16},
  color: colors.mainTint,
  mode: 'contained',
};

const grayBorderedButton: typeof Button.defaultProps = {
  labelStyle: {color: colors.textSecondary, fontSize: 12},
  color: 'gray',
  mode: 'outlined',
};

export default {
  commonTextInput,
  idTextInput,
  passwordTextInput,
  wideButton,
  wideThemedButton,
  grayBorderedButton,
};

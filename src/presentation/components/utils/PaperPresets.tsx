import colors from '../../res/colors';
import {Button} from 'react-native-paper';
import {PaperTextInputPropsWithoutRef} from './PaperPropTypes';

const commonTextInput: PaperTextInputPropsWithoutRef = {
  mode: 'outlined',
  theme: {
    colors: {
      primary: colors.mainTint,
      placeholder: colors.textSecondary,
    },
  },
  selectionColor: colors.mainTint,
};

const idTextInput: PaperTextInputPropsWithoutRef = {
  ...commonTextInput,
  returnKeyType: 'next',
  keyboardType: 'number-pad',
};

const passwordTextInput: PaperTextInputPropsWithoutRef = {
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

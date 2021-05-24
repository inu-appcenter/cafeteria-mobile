/**
 * This file is part of INU Cafeteria.
 *
 * Copyright (C) 2021 INU Global App Center <potados99@gmail.com>
 *
 * INU Cafeteria is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * INU Cafeteria is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import {TextInputProps} from 'react-native-paper/lib/typescript/components/TextInput/TextInput';

export type PaperTextInputProps = Pick<
  TextInputProps,
  | 'ref'
  | 'label'
  | 'style'
  | 'pointerEvents'
  | 'allowFontScaling'
  | 'numberOfLines'
  | 'onLayout'
  | 'testID'
  | 'nativeID'
  | 'maxFontSizeMultiplier'
  | 'selectionColor'
  | 'textBreakStrategy'
  | 'accessible'
  | 'accessibilityActions'
  | 'accessibilityLabel'
  | 'accessibilityRole'
  | 'accessibilityState'
  | 'accessibilityHint'
  | 'accessibilityValue'
  | 'onAccessibilityAction'
  | 'accessibilityLiveRegion'
  | 'importantForAccessibility'
  | 'accessibilityElementsHidden'
  | 'accessibilityViewIsModal'
  | 'onAccessibilityEscape'
  | 'onAccessibilityTap'
  | 'onMagicTap'
  | 'accessibilityIgnoresInvertColors'
  | 'key'
  | 'hitSlop'
  | 'removeClippedSubviews'
  | 'collapsable'
  | 'needsOffscreenAlphaCompositing'
  | 'renderToHardwareTextureAndroid'
  | 'focusable'
  | 'shouldRasterizeIOS'
  | 'isTVSelectable'
  | 'hasTVPreferredFocus'
  | 'tvParallaxProperties'
  | 'tvParallaxShiftDistanceX'
  | 'tvParallaxShiftDistanceY'
  | 'tvParallaxTiltAngle'
  | 'tvParallaxMagnification'
  | 'onStartShouldSetResponder'
  | 'onMoveShouldSetResponder'
  | 'onResponderEnd'
  | 'onResponderGrant'
  | 'onResponderReject'
  | 'onResponderMove'
  | 'onResponderRelease'
  | 'onResponderStart'
  | 'onResponderTerminationRequest'
  | 'onResponderTerminate'
  | 'onStartShouldSetResponderCapture'
  | 'onMoveShouldSetResponderCapture'
  | 'onTouchStart'
  | 'onTouchMove'
  | 'onTouchEnd'
  | 'onTouchCancel'
  | 'onTouchEndCapture'
  | 'render'
  | 'left'
  | 'right'
  | 'disabled'
  | 'onBlur'
  | 'onFocus'
  | 'multiline'
  | 'value'
  | 'mode'
  | 'error'
  | 'placeholder'
  | 'textAlign'
  | 'textAlignVertical'
  | 'onContentSizeChange'
  | 'onScroll'
  | 'scrollEnabled'
  | 'autoCapitalize'
  | 'autoCorrect'
  | 'autoFocus'
  | 'blurOnSubmit'
  | 'caretHidden'
  | 'contextMenuHidden'
  | 'defaultValue'
  | 'editable'
  | 'keyboardType'
  | 'maxLength'
  | 'onChange'
  | 'onChangeText'
  | 'onEndEditing'
  | 'onSelectionChange'
  | 'onSubmitEditing'
  | 'onTextInput'
  | 'onKeyPress'
  | 'placeholderTextColor'
  | 'returnKeyType'
  | 'secureTextEntry'
  | 'selectTextOnFocus'
  | 'selection'
  | 'inputAccessoryViewID'
  | 'clearButtonMode'
  | 'clearTextOnFocus'
  | 'dataDetectorTypes'
  | 'enablesReturnKeyAutomatically'
  | 'keyboardAppearance'
  | 'passwordRules'
  | 'rejectResponderTermination'
  | 'selectionState'
  | 'spellCheck'
  | 'textContentType'
  | 'autoCompleteType'
  | 'importantForAutofill'
  | 'disableFullscreenUI'
  | 'inlineImageLeft'
  | 'inlineImagePadding'
  | 'returnKeyLabel'
  | 'underlineColorAndroid'
  | 'showSoftInputOnFocus'
  | 'underlineColor'
  | 'dense'
> & {
  theme?:
    | import('@callstack/react-theme-provider').$DeepPartial<ReactNativePaper.Theme>
    | undefined;
};

export type PaperTextInputPropsWithoutRef = Omit<PaperTextInputProps, 'ref'>;

import React from 'react';
import Config from '../../../../common/Config';
import {WebView} from 'react-native-webview';

export default function TermsAndConditions() {
  return <WebView source={{uri: Config.webPageUrl.termsAndConditions}} />;
}

import React from 'react';
import {WebView} from 'react-native-webview';
import Config from '../../../../common/Config';

export default function FrequentQuestions() {
  return <WebView source={{uri: Config.webPageUrl.frequentQuestions}} />;
}

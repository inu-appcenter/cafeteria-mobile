import React from 'react';
import Config from '../../../../common/Config';
import {WebView} from 'react-native-webview';

export default function ServiceManual() {
  return (
    <WebView
      source={{uri: Config.webPageUrl.serviceManual}}
      scalesPageToFit={true}
    />
  );
}

import React from 'react';
import colors from '../res/colors';
import palette from '../res/palette';
import {WebView} from 'react-native-webview';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

type Props = {
  uri: string;
};

export default function LoadingWebView({uri}: Props) {
  return (
    <WebView
      source={{uri: uri}}
      injectedJavaScript={fitWidth}
      scalesPageToFit={false}
      startInLoadingState={true}
      renderLoading={() => (
        <View style={styles.container}>
          <ActivityIndicator size={32} color={colors.mainTint} />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    ...palette.centeringContainer,
    ...palette.whiteBackground,
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
});

/**
 * 안드로이드 웹 뷰에서는 viewport 메타 태그가 없으면 컨텐트가 기기 폭에 맞춰지지 않습니다.
 * 그래서 강제로 집어넣어 줍니다.
 * 이미 페이지에 해당 태그가 있어도 상관 없나봅니다.
 */
const fitWidth = `
    const meta = document.createElement('meta');
    meta.setAttribute('content', 'initial-scale=1.0, maximum-scale=1.0'); 
    meta.setAttribute('name', 'viewport'); 
    document.getElementsByTagName('head')[0].appendChild(meta);
`;

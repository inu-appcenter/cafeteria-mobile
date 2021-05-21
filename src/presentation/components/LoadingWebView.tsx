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
      startInLoadingState={true}
      renderLoading={() => (
        <View style={styles.container}>
          <ActivityIndicator size={32} color={colors.themeBlue} />
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

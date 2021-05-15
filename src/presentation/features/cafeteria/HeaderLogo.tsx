import React from 'react';
import {Image, StyleSheet} from 'react-native';

export default function HeaderLogo() {
  return (
    <Image
      style={styles.headerLogo}
      resizeMode="contain"
      source={require('../../res/images/header_logo.png')}
    />
  );
}

const styles = StyleSheet.create({
  headerLogo: {
    height: 17,
  },
});

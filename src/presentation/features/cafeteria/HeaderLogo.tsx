import {Image, StyleSheet} from 'react-native';
import React from 'react';

export default class HeaderLogo extends React.Component {
  render() {
    return (
      <Image
        style={styles.headerLogo}
        resizeMode="contain"
        source={require('../../res/images/header_logo.png')}
      />
    );
  }
}

const styles = StyleSheet.create({
  headerLogo: {
    height: 17,
  },
});

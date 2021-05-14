import {StyleSheet} from 'react-native';
import colors from './colors';

const palette = StyleSheet.create({
  centeringContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  fullSized: {
    flex: 1,
  },

  bottomFullWidth: {
    position: 'absolute',
    bottom: 6,
    start: 6,
    end: 6,
  },

  textHeader: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: 'bold',
  },
  textPrimary: {
    color: colors.textPrimary,
    fontSize: 16,
  },
  textSecondary: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  textTertiary: {
    color: colors.textTertiary,
    fontSize: 12,
  },

  boldText: {
    fontWeight: 'bold',
  },

  whiteBackground: {
    backgroundColor: colors.white,
  },

  shadowedTopBar: {
    shadowColor: 'black',

    // iOS
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 2,
    shadowOpacity: 0.2,

    // Android
    elevation: 4,
  },
});

export default palette;

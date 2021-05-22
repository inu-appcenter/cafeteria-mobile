import {Platform, StyleSheet} from 'react-native';
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
  horizontalSpace: {
    marginHorizontal: 12,
  },
  absoluteCenter: {
    position: 'absolute',
    top: 0,
    end: 0,
    start: 0,
    bottom: 0,
  },

  bottomFullWidth: {
    position: 'absolute',
    bottom: 6,
    start: 6,
    end: 6,
  },

  textHeader: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: 'bold',
  },
  textSubHeader: {
    color: colors.textPrimary,
    fontSize: 19,
    fontWeight: 'bold',
  },
  textPrimary: {
    color: colors.textPrimary,
    fontSize: 16,
  },
  textSubPrimary: {
    color: colors.textPrimary,
    fontSize: 14,
  },
  textSecondary: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  textSubSecondary: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  textTertiary: {
    color: colors.textTertiary,
    fontSize: 12,
  },

  boldText: {
    fontWeight: 'bold',
  },
  lightText: {
    fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined,
    fontWeight: '300',
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

  iconHeaderButton: {
    paddingHorizontal: 18,
  },
});

export default palette;

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

import {Platform, StyleSheet} from 'react-native';
import colors from './colors';

const palette = StyleSheet.create({
  whiteFullSized: {
    flex: 1,
    backgroundColor: colors.white,
  },

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
  textBigHeader: {
    color: colors.textPrimary,
    fontSize: 28,
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

  noSeparator: {
    // iOS
    shadowOpacity: 0,

    // Android
    elevation: 0,
  },

  iconHeaderButton: {
    paddingHorizontal: 18,
  },

  bottomButton: {
    position: 'absolute',
    bottom: 12,
    start: 12,
    end: 12,
  },

  floatingActionButton: {
    position: 'absolute',
    bottom: 0,
    end: 0,
    margin: 16,
    backgroundColor: colors.mainTint,
  },
});

export default palette;

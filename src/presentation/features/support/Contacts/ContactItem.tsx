/**
 * This file is part of INU Cafeteria.
 *
 * Copyright 2021 INU Global App Center <potados99@gmail.com>
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

import React from 'react';
import colors from '../../../res/colors';
import palette from '../../../res/palette';
import {Button} from 'react-native-paper';
import CardView from '../../../components/CardView';
import {Image, ImageSourcePropType, StyleSheet, Text, ViewProps} from 'react-native';
import PaperPresets from '../../../components/utils/PaperPresets';

type Props = ViewProps & {
  imageSource: ImageSourcePropType;
  title: string;
  body: string;
  buttonText: string;
  action: () => void;
};

export default function ContactItem({imageSource, title, body, buttonText, action}: Props) {
  return (
    <CardView style={styles.container}>
      <Image resizeMode="contain" style={styles.image} source={imageSource} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
      <Button {...PaperPresets.wideThemedButton} onPress={action} style={styles.button}>
        {buttonText}
      </Button>
    </CardView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 21,
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    height: 37,
    marginVertical: 8,
  },
  title: {
    ...palette.textSubHeader,
    marginTop: 12,
  },
  body: {
    ...palette.textSecondary,
    marginTop: 8,
    textAlign: 'center',
    marginHorizontal: 12,
  },
  button: {
    alignSelf: 'stretch',
    marginTop: 21,
  },
});

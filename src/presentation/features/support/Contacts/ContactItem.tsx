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

import React from 'react';
import colors from '../../../res/colors';
import palette from '../../../res/palette';
import {Button} from 'react-native-paper';
import CardView from '../../../components/CardView';
import {Image, ImageSourcePropType, Text, ViewProps} from 'react-native';

type Props = ViewProps & {
  imageSource: ImageSourcePropType;
  title: string;
  body: string;
  buttonText: string;
  action: () => void;
};

export default function ContactItem({
  imageSource,
  title,
  body,
  buttonText,
  action,
}: Props) {
  return (
    <CardView
      style={{
        marginHorizontal: 16,
        marginTop: 21,
        padding: 16,
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <Image
        resizeMode="contain"
        style={{height: 37, marginVertical: 8}}
        source={imageSource}
      />
      <Text style={[palette.textSubHeader, {marginTop: 12}]}>{title}</Text>
      <Text
        style={[
          palette.textSecondary,
          {
            marginTop: 8,
            textAlign: 'center',
            marginHorizontal: 12,
          },
        ]}>
        {body}
      </Text>
      <Button
        mode="contained"
        labelStyle={[
          palette.textPrimary,
          {color: colors.white, paddingVertical: 4},
        ]}
        color={colors.mainTint}
        onPress={action}
        style={{alignSelf: 'stretch', marginTop: 21}}>
        {buttonText}
      </Button>
    </CardView>
  );
}

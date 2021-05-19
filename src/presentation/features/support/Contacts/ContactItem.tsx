import React from 'react';
import {Image, ImageSourcePropType, Text, ViewProps} from 'react-native';
import CardView from '../../../components/CardView';
import {Button} from 'react-native-paper';
import PaperPresets from '../../../components/utils/PaperPresets';
import colors from '../../../res/colors';
import palette from '../../../res/palette';

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
        marginVertical: 12,
        padding: 16,
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <Image
        resizeMode="contain"
        style={{height: 35, marginVertical: 12}}
        source={imageSource}
      />
      <Text style={[palette.textSubHeader, {marginTop: 12}]}>{title}</Text>
      <Text
        style={[
          palette.textPrimary,
          {
            marginTop: 12,
            textAlign: 'center',
            marginHorizontal: 12,
          },
        ]}>
        {body}
      </Text>
      <Button
        mode="contained"
        labelStyle={[palette.textPrimary, {color: colors.white}]}
        color={colors.themeBlue}
        onPress={action}
        style={{alignSelf: 'stretch', marginTop: 21, paddingVertical: 4}}>
        {buttonText}
      </Button>
    </CardView>
  );
}

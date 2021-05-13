import React from 'react';
import MenuView from './MenuView';
import Touchable from '../../components/Touchable';
import {Image, StyleSheet, Text, View} from 'react-native';
import palette from '../../res/palette';

const images = [
  null,
  require('../../res/images/available_1.png'),
  require('../../res/images/available_2.png'),
  require('../../res/images/available_3.png'),
  require('../../res/images/available_4.png'),
  require('../../res/images/available_5.png'),
  require('../../res/images/available_6.png'),
  require('../../res/images/available_7.png'),
];

export default class MenuItem extends React.Component<
  {menu: MenuView},
  {lines: number}
> {
  state = {
    lines: 1,
  };

  private get availableTimeImage() {
    const {menu} = this.props;

    return images[menu.availableAt];
  }

  private get priceAndCalorieString() {
    const {menu} = this.props;

    const caloriePart = `${Number(menu.calorie).toLocaleString()}kcal`;
    const pricePart = `${Number(menu.price).toLocaleString()}원`;
    const separatorPart =
      caloriePart.length > 0 && pricePart.length > 0 ? ' · ' : '';

    return caloriePart + separatorPart + pricePart;
  }

  render() {
    const {menu} = this.props;
    const {lines} = this.state;
    const setMaxLines = (max: number) => {
      this.setState({
        lines: max,
      });
    };

    return (
      <Touchable onPress={() => setMaxLines(5)}>
        {/* Root */}
        <View style={styles.rootContainer}>
          {/* Available time view */}
          <Image
            style={styles.availableTimeImage}
            resizeMode="contain"
            source={this.availableTimeImage}
          />

          {/* The rest */}
          <View style={styles.textPartContainer}>
            {/* Foods */}
            <Text
              numberOfLines={lines}
              ellipsizeMode={'tail'}
              style={styles.foodsText}>
              {menu.foods.join(', ')}
            </Text>

            {/* Price and calorie */}
            <View style={styles.bottomTextContainer}>
              <Text style={palette.textSecondary}>{menu.cornerName}</Text>
              <Text style={palette.textSecondary}>
                {this.priceAndCalorieString}
              </Text>
            </View>
          </View>
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 12,
  },

  availableTimeImage: {
    width: 50,
    height: 50,
  },

  textPartContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginStart: 12,
  },

  foodsText: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  bottomTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});

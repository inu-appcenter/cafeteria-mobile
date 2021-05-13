import React from 'react';
import {
  Dimensions,
  FlatListProps,
  ListRenderItemInfo,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

/**
 * A simple carousel implementation.
 * It calculates a size of sneak by width of item and a gap between items.
 */
export default class Carousel<ItemT = any> extends React.Component<
  FlatListProps<ItemT> & {gap: number; itemWidth: number | string}
> {
  private IS_ANDROID = Platform.OS === 'android';
  private SCREEN_WIDTH = Dimensions.get('window').width;

  private get itemWidth() {
    const {itemWidth} = this.props;

    if (typeof itemWidth === 'number') {
      return itemWidth;
    }

    const isPercentageRepresentation = /^\d{1,3}(\.\d+)?%$/.test(itemWidth);
    if (isPercentageRepresentation) {
      return (this.SCREEN_WIDTH * parseInt(itemWidth, 10)) / 100;
    } else {
      console.error(`Carousel: invalid itemWidth: ${itemWidth}`);
      return 0;
    }
  }

  private getDimensions() {
    const {gap} = this.props;

    const sideSpaces = this.SCREEN_WIDTH - this.itemWidth;

    return {
      gap,
      itemWidth: this.itemWidth,
      screenWidth: this.SCREEN_WIDTH,
      onePageInterval: this.itemWidth + gap,
      itemEdgeToScreenEdge: sideSpaces / 2,
      horizontalPaddingAmongList: sideSpaces / 2 - gap / 2,
      horizontalMarginBetweenItems: gap / 2,
    };
  }

  private renderItems(items: ReadonlyArray<ItemT> | null | undefined) {
    const {renderItem} = this.props;
    const {itemWidth, horizontalMarginBetweenItems} = this.getDimensions();

    return items?.map((item, index) => {
      const itemInfo: ListRenderItemInfo<ItemT> = {
        index: index,
        item: item,
        separators: {
          highlight: () => {},
          unhighlight: () => {},
          updateProps: () => {},
        },
      };

      const computedStyles = StyleSheet.create({
        item: {
          width: itemWidth,
          overflow: 'visible',
          marginHorizontal: horizontalMarginBetweenItems,
        },
      });

      return (
        <View key={index} style={computedStyles.item}>
          {renderItem?.call(undefined, itemInfo)}
        </View>
      );
    });
  }

  private getPlatformSpecificPropsForScrollView() {
    const {horizontalPaddingAmongList} = this.getDimensions();

    /**
     * For padding on first and last item,
     * we use paddingHorizontal for android,
     * and contentInset/contentOffset for ios.
     *
     * More details: https://medium.com/nerd-for-tech/react-native-create-a-horizontal-snap-scrollview-e1d01ac3ba09
     */

    return {
      contentContainerStyle: {
        paddingHorizontal: this.IS_ANDROID ? horizontalPaddingAmongList : 0,
      },

      // iOS only.
      contentOffset: {
        x: -horizontalPaddingAmongList,
        y: 0,
      },

      // iOS only.
      contentInset: {
        top: 0,
        left: horizontalPaddingAmongList,
        right: horizontalPaddingAmongList,
        bottom: 0,
      },
    };
  }

  render() {
    const {data, bounces, style, contentContainerStyle} = this.props;
    const {onePageInterval} = this.getDimensions();
    const platformSpecificProps = this.getPlatformSpecificPropsForScrollView();

    return (
      <ScrollView
        style={style}
        bounces={bounces}
        horizontal={true}
        decelerationRate="fast"
        scrollEventThrottle={100}
        snapToAlignment={'center'}
        disableIntervalMomentum={true}
        snapToInterval={onePageInterval}
        showsHorizontalScrollIndicator={false}
        {...platformSpecificProps}
        contentContainerStyle={[
          {...platformSpecificProps.contentContainerStyle},
          contentContainerStyle, // override
        ]}>
        {this.renderItems(data)}
      </ScrollView>
    );
  }
}

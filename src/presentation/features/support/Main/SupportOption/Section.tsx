import React from 'react';
import ItemSeparator from '../../../../components/ItemSeparator';
import {SupportMainNavigation} from '../../SupportScreen';
import {ScrollView, StyleSheet, View, ViewProps} from 'react-native';

type Props = ViewProps & {
  children: React.ReactNode[] | React.ReactNode;
  navigation: SupportMainNavigation;
};

export default function Section({style, children, navigation}: Props) {
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {navigation});
    }

    return child;
  });

  const childrenWithSeparator = childrenWithProps?.map((child, index) => {
    const separator = <ItemSeparator style={{marginStart: 21}} />;
    const isLast = index === childrenWithProps.length - 1;
    const inTheMiddle = !isLast;

    return (
      <View key={index.toString()}>
        {child}
        {inTheMiddle ? separator : null}
      </View>
    );
  });

  return (
    <ScrollView style={[styles.horizontallyFull, style]}>
      {childrenWithSeparator}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  horizontallyFull: {
    alignSelf: 'stretch',
  },
});

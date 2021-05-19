import React from 'react';
import {SupportMainNavigation} from '../../SupportScreen';
import {ScrollView, StyleSheet, ViewProps} from 'react-native';

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

  return (
    <ScrollView style={[styles.horizontallyFull, style]}>
      {childrenWithProps}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  horizontallyFull: {
    alignSelf: 'stretch',
  },
});

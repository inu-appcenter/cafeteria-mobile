import {Alert, Platform, ToastAndroid} from 'react-native';

export default function notify(message: string) {
  if (Platform.OS === 'ios') {
    Alert.alert(message);
  } else {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }
}

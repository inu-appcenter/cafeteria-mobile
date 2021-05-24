import alert from './alert';
import {Platform, ToastAndroid} from 'react-native';

export default function notify(message: string) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    alert(message);
  }
}

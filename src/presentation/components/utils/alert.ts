import {Alert} from 'react-native';

export default function alert(title: string, message?: string) {
  Alert.alert(title, message, [{text: '확인', style: 'default'}], {
    cancelable: true,
  });
}

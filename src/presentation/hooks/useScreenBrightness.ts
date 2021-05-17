// @ts-ignore
import DeviceBrightness from '@adrianso/react-native-device-brightness';
import {useState} from 'react';

export default function useScreenBrightness() {
  const [isBright, setIsBright] = useState(false);
  const [originalBrightness, setOriginalBrightness] = useState(0);

  const toggleBrightness = async () => {
    if (isBright) {
      await DeviceBrightness.setBrightnessLevel(originalBrightness);
    } else {
      setOriginalBrightness(await DeviceBrightness.getBrightnessLevel());
      await DeviceBrightness.setBrightnessLevel(1);
    }

    setIsBright(!isBright);
  };

  return [toggleBrightness];
}

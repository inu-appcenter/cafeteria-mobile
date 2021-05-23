/**
 * Entry file!
 */

import 'reflect-metadata'; // 이 녀석 위치가 참 중요합니다. 제일 처음에 있어야 해요!

import App from './src/presentation/App';
import setupAxios from './src/common/utils/setupAxios';
import {name as appName} from './app.json';
import {AppRegistry, LogBox} from 'react-native';

setupAxios();

LogBox.ignoreLogs(['ReactNativeFiberHostComponent', 'Reanimated 2']);

AppRegistry.registerComponent(appName, () => App);

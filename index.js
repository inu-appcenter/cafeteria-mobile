/**
 * Entry file!
 */

import 'reflect-metadata'; // 이 녀석 위치가 참 중요하다. 제일 처음에 있어야 한다.

import App from './src/presentation/App';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import setupAxios from './src/common/utils/setupAxios';

setupAxios();

AppRegistry.registerComponent(appName, () => App);

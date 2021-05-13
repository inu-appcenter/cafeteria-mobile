/**
 * Entry file!
 */

import App from './src/presentation/App';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

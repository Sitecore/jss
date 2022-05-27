import { registerRootComponent } from 'expo';
import Constants from 'expo-constants';
import { enableDebug } from '@sitecore-jss/sitecore-jss-react-native';

import 'react-native-gesture-handler';

import App from './src/App';

if (Constants.manifest.extra.debug) {
  enableDebug(Constants.manifest.extra.debug);
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

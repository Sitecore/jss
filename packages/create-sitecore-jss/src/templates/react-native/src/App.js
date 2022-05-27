import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-react-native';
import componentFactory from './temp/componentFactory';
import Screen from './Screen';

const Stack = createStackNavigator();

export default () => (
  <SitecoreContext componentFactory={componentFactory}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="/" component={Screen} options={{ headerShown: false }} />
        <Stack.Screen name="/styleguide" component={Screen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  </SitecoreContext>
);

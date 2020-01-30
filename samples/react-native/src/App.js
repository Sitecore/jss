import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Styleguide from './screens/Styleguide'
import Home from './screens/Home'

const Navigator = createStackNavigator({
  Home: { screen: Home },
  Styleguide: { screen: Styleguide }
}, {
  initialRouteName: 'Home',
  headerMode: 'none'
})

const AppNavigator = createAppContainer(Navigator)

export default AppNavigator

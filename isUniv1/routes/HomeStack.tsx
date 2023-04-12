/*eslint-disable prettier/prettier*/
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Map';

const screens = [{name: 'Home', screen: Home}];
const Stack = createStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator>
      {screens.map(screen => {
        return <Stack.Screen name={screen.name} component={screen.screen} />;
      })}
    </Stack.Navigator>
  );
};

export default HomeStack;

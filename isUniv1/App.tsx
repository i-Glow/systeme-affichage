/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Map from './screens/Map';
import Home from './screens/Home';
/* type Screen = {
  lat: number;
  lon: number;
  description: string;
}; */
function App() {
  const screens = [
    {name: 'Home', screen: Home},
    {name: 'Map', screen: Map},
  ];
  const Stack = createNativeStackNavigator();
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          {screens.map(screen => {
            return (
              <Stack.Screen
                key={screen.name}
                name={screen.name}
                component={screen.screen}
              />
            );
          })}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;

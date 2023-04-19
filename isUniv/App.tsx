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
import News from './screens/News';
import Article from './screens/Article';
import Menu from './screens/Menu';
import Affichage from './screens/Affichage';

export type RootStackParams = {
  News;
  Map;
  Article: {
    id: number;
  };
  Menu;
  Affichage;
};

function App() {
  const Stack = createNativeStackNavigator<RootStackParams>();
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="News">
          <Stack.Screen name="News" component={News} />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="Article" component={Article} />
          <Stack.Screen name="Menu" component={Menu} />
          <Stack.Screen name="Affichage" component={Affichage} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;

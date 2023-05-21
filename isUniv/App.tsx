/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {Dispatch, SetStateAction, createContext, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Map from './screens/Map';
import News from './screens/News';
import Article from './screens/Article';
import Menu from './screens/Menu';
import Affichage from './screens/Affichage';
import Support from './screens/Support';
import GradeRepport from './screens/GradeRepport';
import TicketPage from './screens/TicketPage';
import Testimonial from './screens/Testimonial';
import SchoolCertificate from './screens/SchoolCertificate';
import Login from './screens/LogIn';
import Profile from './screens/Profile';
export type RootStackParams = {
  News: undefined;
  Article: {
    title: string;
    Paragh: string;
    time: string;
  };
  MenuStackPage: undefined;
  Login: undefined;
  BarCodeScanner: undefined;
  Profile: undefined;
};

export type MenuStackParams = {
  Menu: undefined;
  Map: undefined;
  Affichage: undefined;
  SupportStackPage: undefined;
};

export type SuppotStackParams = {
  Support: undefined;
  GradeRepport: undefined;

  TicketPage: {
    type: string;
  };
  Testimonial: {
    type: string;
  };
  SchoolCertificate: {
    type: string;
  };
};

const AppStack = createNativeStackNavigator<RootStackParams>();
const MenuStack = createNativeStackNavigator<MenuStackParams>();
const SupportStack = createNativeStackNavigator<SuppotStackParams>();

function SupportStackPage() {
  return (
    <SupportStack.Navigator initialRouteName="Support">
      <SupportStack.Screen
        name="Support"
        component={Support}
        options={{headerTitle: 'Support'}}
      />
      <SupportStack.Screen name="GradeRepport" component={GradeRepport} />
      <SupportStack.Screen name="Testimonial" component={Testimonial} />
      <SupportStack.Screen
        name="SchoolCertificate"
        component={SchoolCertificate}
      />
      <SupportStack.Screen name="TicketPage" component={TicketPage} />
    </SupportStack.Navigator>
  );
}

function MenuStackPage() {
  return (
    <MenuStack.Navigator initialRouteName="Menu">
      <MenuStack.Screen
        name="Menu"
        component={Menu}
        options={{headerLeft: () => <></>, headerTitle: 'Menu'}}
      />
      <MenuStack.Screen name="Map" component={Map} />
      <MenuStack.Screen name="Affichage" component={Affichage} />

      <MenuStack.Screen
        name="SupportStackPage"
        component={SupportStackPage}
        options={{headerShown: false}}
      />
    </MenuStack.Navigator>
  );
}

type BottomBarContextType = {
  activeScreen: string | null;
  setActiveScreen: Dispatch<SetStateAction<string | null>>;
};

export const BottomBarContext = createContext<BottomBarContextType>({
  activeScreen: null,
  setActiveScreen: () => {},
});

function App() {
  const [activeScreen, setActiveScreen] = useState<string | null>(null);
  return (
    <>
      <BottomBarContext.Provider value={{activeScreen, setActiveScreen}}>
        <NavigationContainer>
          <AppStack.Navigator initialRouteName="Login">
            <AppStack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />

            <AppStack.Screen
              name="News"
              component={News}
              options={{headerLeft: () => <></>, headerTitle: 'News'}}
            />
            <AppStack.Screen name="Article" component={Article} />
            <AppStack.Screen
              name="Profile"
              component={Profile}
              options={{headerShown: false}}
            />

            <AppStack.Screen
              name="MenuStackPage"
              component={MenuStackPage}
              options={{headerShown: false}}
            />
          </AppStack.Navigator>
        </NavigationContainer>
      </BottomBarContext.Provider>
    </>
  );
}

export default App;

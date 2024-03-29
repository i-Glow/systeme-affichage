/*eslint-disable prettier/prettier*/

import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {BottomBarContext, RootStackParams} from '../App';
import {StackNavigationProp} from '@react-navigation/stack';

function NavBar() {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const {activeScreen} = useContext(BottomBarContext);

  return (
    <>
      <View style={styles.Container}>
        <Pressable
          style={[
            styles.Pressable,
            activeScreen === 'Affichage' && styles.activeButton,
          ]}
          onPress={() => {
            navigation.navigate('Affichage');
          }}>
          <Image
            source={
              activeScreen === 'Affichage'
                ? require('../assets/NewsBlack.png')
                : require('../assets/NewsWhite.png')
            }
            style={[
              styles.Image,
              activeScreen === 'Affichage' && styles.activeImage,
            ]}
          />
        </Pressable>

        <Pressable
          style={[
            styles.Pressable,
            activeScreen === 'MenuStackPage' && styles.activeButton,
          ]}
          onPress={() => {
            navigation.navigate('MenuStackPage');
          }}>
          <Image
            source={
              activeScreen === 'MenuStackPage'
                ? require('../assets/HomeBlack.png')
                : require('../assets/HomeWhite.png')
            }
            style={[
              styles.Image,
              activeScreen === 'MenuStackPage' && styles.activeImage,
            ]}
          />
        </Pressable>

        <Pressable
          style={[
            styles.Pressable,
            activeScreen === 'Profile' && styles.activeButton,
          ]}
          onPress={() => {
            navigation.navigate('Profile');
          }}>
          <Image
            source={
              activeScreen === 'Profile'
                ? require('../assets/userBlack.png')
                : require('../assets/userWhite.png')
            }
            style={[
              styles.Image,
              activeScreen === 'Profile' && styles.activeImage,
            ]}
          />
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#161326',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  Pressable: {
    width: '30%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Image: {
    width: 45,
    height: 45,
    // opacity: 0.8,
    // #837e7e
  },
  activeImage: {
    width: 45,
    height: 45,
  },
  activeButton: {
    width: '30%',
    height: '80%',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
export default NavBar;

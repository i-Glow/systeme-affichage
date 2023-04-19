/*eslint-disable prettier/prettier*/

import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {RootStackParams} from '../App';
import {StackNavigationProp} from '@react-navigation/stack';

function NavBar() {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  return (
    <>
      <View style={styles.Container}>
        <Pressable
          style={styles.Pressable}
          onPress={() => {
            navigation.navigate('News');
          }}>
          <Image
            source={require('../assets/journal.png')}
            style={styles.Image}
          />
        </Pressable>
        <Pressable
          style={styles.Pressable}
          onPress={() => {
            navigation.navigate('Menu');
          }}>
          <Image
            source={require('../assets/accueil.png')}
            style={styles.Image}
          />
        </Pressable>
        {/* <Pressable
          style={styles.Pressable}
          onPress={() => {
            navigation.navigate('Map');
          }}>
          <Image source={require('../assets/carte.png')} style={styles.Image} />
        </Pressable> */}
        <Pressable style={styles.Pressable} onPress={() => {}}>
          <Image
            source={require('../assets/cloche.png')}
            style={styles.Image}
          />
        </Pressable>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  Container: {
    width: '90%',
    height: 50,
    backgroundColor: '#cab2fa',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 40,
  },
  Pressable: {
    width: '30%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Image: {
    width: '50%',
    height: '80%',
  },
});
export default NavBar;

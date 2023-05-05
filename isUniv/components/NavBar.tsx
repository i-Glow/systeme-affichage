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
            activeScreen === 'News' && styles.activeButton,
          ]}
          onPress={() => {
            navigation.navigate('News');
          }}>
          <Image
            source={
              activeScreen === 'News'
                ? require('../assets/NewsBlack.png')
                : require('../assets/NewsWhite.png')
            }
            style={[
              styles.Image,
              activeScreen === 'News' && styles.activeImage,
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

/*eslint-disable prettier/prettier*/

import React, {useContext} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import NavBar from '../components/NavBar';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {BottomBarContext} from '../App';
const {height} = Dimensions.get('window');

const BottomBar = height * 0.08;
const ITEM_WIDTH = height / 5.8;

export default function Menu() {
  const {setActiveScreen} = useContext(BottomBarContext);

  useFocusEffect(() => {
    setActiveScreen('MenuStackPage');
  });

  const MenuCarts = [
    {
      id: 1,
      imageUrl: require('../assets/carte.png'),
      screen: 'Map',
      titre: "Carte De L'Univ",
    },
    {
      id: 2,
      imageUrl: require('../assets/journal.png'),
      screen: 'Affichage',
      titre: 'Affichage',
    },
    {
      id: 3,
      imageUrl: require('../assets/Support.png'),
      screen: 'SupportStackPage',
      titre: 'Support',
    },
    {
      id: 4,
      imageUrl: require('../assets/Support.png'),
      screen: 'GoogleMap',
      titre: 'GoogleMap',
    },
  ];
  const navigation = useNavigation();

  return (
    <>
      <StatusBar />
      <SafeAreaView style={{flex: 1, flexGrow: 1}}>
        <View style={styles.Container}>
          <View style={styles.Container}>
            <FlatList
              data={MenuCarts}
              numColumns={2}
              keyExtractor={(item: any) => item.id}
              contentContainerStyle={styles.MenuContainerCard}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    //it work juste fine
                    navigation.navigate(item.screen);
                  }}
                  style={styles.OneCard}>
                  <Image source={item.imageUrl} style={styles.Image} />
                  <Text style={styles.MenuOption}>{item.titre}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <View style={styles.NavContainer}>
            <NavBar />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexGrow: 1,
  },
  NavContainer: {
    height: BottomBar,
  },
  /* NavContainer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
    left: 0,
    right: 0,
  }, */
  MenuContainer: {
    flex: 1,
    flexGrow: 1,
  },
  MenuContainerCard: {
    padding: '1.5%',
    paddingTop: '5%',
    gap: 15,
  },
  OneCard: {
    width: '45%',
    height: ITEM_WIDTH,
    marginRight: '5%',
    marginLeft: '1.5%',
    marginBottom: '5%',
    gap: 5,
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    shadowColor: '#000',
    shadowOffset: {width: 20, height: 20},
    shadowOpacity: 0.8,
    shadowRadius: 100,
    elevation: 10,
    paddingBottom: 5,
  },
  Image: {
    width: '65%',
    height: '80%',
  },
  MenuOption: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
});

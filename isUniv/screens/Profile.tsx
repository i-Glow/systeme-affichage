/*eslint-disable prettier/prettier*/

import React, {useContext} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import NavBar from '../components/NavBar';
import {BottomBarContext} from '../App';
import {useFocusEffect} from '@react-navigation/native';

const {height} = Dimensions.get('window');

const BottomBar = height * 0.08;
const ItemBox = height * 0.08;
export default function Profile() {
  const {setActiveScreen} = useContext(BottomBarContext);

  useFocusEffect(() => {
    setActiveScreen('Profile');
  });

  const Data = [
    {
      id: 1,
      Nom: 'Zebiri',
      Prenom: 'Azedine',
      birthday: ' 2002-05-01',
      placeOfBirth: 'El-Khroub-Constantine',
    },
  ];

  return (
    <>
      <StatusBar />
      <SafeAreaView style={{flex: 1, flexGrow: 1}}>
        <View style={styles.Container}>
          <View style={styles.Body}>
            <View style={styles.HeaderBar}>
              <Text style={styles.title}>Mon Profile</Text>
              <TouchableOpacity>
                <Image
                  style={styles.Image}
                  source={require('../assets/logout.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.BoxContainer}>
              {/*  */}
              <View style={styles.IdentifiantStyleBox1}>
                <Image
                  style={styles.Image}
                  source={require('../assets/userProfile.png')}
                />
                <View>
                  <Text>Nom & Prenom</Text>
                  <Text
                    style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
                    Azedine Zebiri
                  </Text>
                </View>
              </View>
              {/*  */}
              <View style={styles.IdentifiantStyleBox2}>
                <View style={styles.identifiant}>
                  <Image
                    style={styles.Image}
                    source={require('../assets/location.png')}
                  />
                  <View>
                    <Text>Lieu de naissance</Text>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}>
                      El-Khroub-Constantine
                    </Text>
                  </View>
                </View>
                <View style={styles.identifiant}>
                  <Image
                    style={styles.Image}
                    /* #6ECC83 */
                    source={require('../assets/calendar.png')}
                  />
                  <View>
                    <Text>Date de naissance</Text>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}>
                      2002-05-01
                    </Text>
                  </View>
                </View>
              </View>
              {/*  */}
            </View>
            <TouchableOpacity style={styles.Button}>
              <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>
                Deconnecte
              </Text>
            </TouchableOpacity>
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
  Body: {
    flex: 1,
    flexGrow: 1,
    padding: '5%',
  },
  NavContainer: {
    height: BottomBar,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  HeaderBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8%',
  },
  BoxContainer: {
    display: 'flex',
    gap: 10,
  },
  IdentifiantStyleBox1: {
    borderWidth: 1,
    borderColor: '#afaeb7',
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    padding: '2%',
    borderRadius: 8,
  },
  IdentifiantStyleBox2: {
    borderWidth: 1,
    borderColor: '#afaeb7',
    display: 'flex',
    gap: 15,
    alignItems: 'center',
    padding: '2%',
    borderRadius: 8,
  },
  identifiant: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    gap: 15,
  },
  Button: {
    width: '30%',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    height: '6%',
    borderRadius: 15,
    marginTop: '15%',
    alignSelf: 'flex-end',
  },
  Image: {
    width: 30,
    height: 30,
  },
});

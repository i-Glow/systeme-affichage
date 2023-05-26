/*eslint-disable prettier/prettier*/

import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import NavBar from '../components/NavBar';
import {BottomBarContext} from '../App';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../App';
const {height, width} = Dimensions.get('window');

const BottomBar = height * 0.08;
const heightCashedDiv = height * 0.2;
const widthCashedDiv = width * 0.6;
export default function Profile() {
  const {setActiveScreen} = useContext(BottomBarContext);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  useFocusEffect(() => {
    setActiveScreen('Profile');
  });
  type ProfileData = {
    nom: string;
    prenom: string;
    matricule: string;
    niveau: string;
  };
  const [profileData, setProfileData] = useState<ProfileData>({});
  const Levels = new Map([
    ['L1', 'License 1 ليسانس'],
    ['L2', 'License 2 ليسانس'],
    ['L3', 'License 3 ليسانس'],
    ['M1', 'Master 1 ماستر'],
    ['M2', 'Master 2 ماستر'],
    ['D', 'Doctorat  دكتور'],
  ]);
  const autoAuth = async () => {
    try {
      // Retrieve the stored authentication data
      const authData = await AsyncStorage.getItem('authData');

      if (authData) {
        return JSON.parse(authData);
      }
    } catch (error) {
      console.error(error);
      // Handle the error
    }
  };
  function handleLogout() {
    const clearLocalStorage = async () => {
      await AsyncStorage.clear();
    };
    clearLocalStorage();
    navigation.navigate('Login');
  }
  useEffect(() => {
    const fetchData = async () => {
      const data = await autoAuth();
      if (data) {
        setProfileData(data);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <StatusBar />
      <SafeAreaView style={{flex: 1, flexGrow: 1}}>
        <View style={styles.Container}>
          <Modal
            animationType="fade"
            transparent
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 20,
                    textAlign: 'center',
                    marginTop: 20,
                  }}>
                  You will be Loged out are you sure ?
                </Text>
                <View style={styles.formbuttonLogOut}>
                  <TouchableOpacity
                    style={styles.buttonLogOut}
                    onPress={() => {
                      handleLogout();
                    }}>
                    <Text
                      style={{color: 'white', fontSize: 16, fontWeight: 600}}>
                      Logout
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonCencel}
                    onPress={() => {
                      setModalVisible(false);
                    }}>
                    <Text>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <View style={styles.Body}>
            <View style={styles.HeaderBar}>
              <Text style={styles.title}>Mon Profile</Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                }}>
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
                    {profileData.nom + ' ' + profileData.prenom}
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

              <View style={styles.IdentifiantStyleBox1}>
                <Image
                  style={styles.Image}
                  source={require('../assets/userProfile.png')}
                />
                <View>
                  <Text>Matricule</Text>
                  <Text
                    style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
                    {profileData.matricule}
                  </Text>
                </View>
              </View>

              <View style={styles.IdentifiantStyleBox1}>
                <Image
                  style={styles.Image}
                  source={require('../assets/userProfile.png')}
                />
                <View>
                  <Text>Niveau</Text>
                  <Text
                    style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
                    {Levels.get(profileData.niveau)}
                  </Text>
                </View>
              </View>
            </View>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',

    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    height: heightCashedDiv,
    width: widthCashedDiv,
    display: 'flex',
    alignItems: 'center',
  },
  formbuttonLogOut: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 20,
  },
  buttonLogOut: {
    alignItems: 'center',
    width: '40%',
    borderColor: 'red',
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'red',
  },
  buttonCencel: {
    alignItems: 'center',
    width: '40%',
    padding: 8,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
  },
});

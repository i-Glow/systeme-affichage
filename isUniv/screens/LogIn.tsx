/*eslint-disable prettier/prettier*/

import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useNavigation, StackActions} from '@react-navigation/native';
import {RootStackParams} from '../App';
import {StackNavigationProp} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
//@ts-ignore
import {ToastAndroid, Platform, AlertIOS} from 'react-native';
const {height} = Dimensions.get('window');

const UpperContainer = height * 0.7;
const Input = height * 0.065;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const [shouldLogin, setShouldLogin] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch(
        'http://192.168.28.1:8080/api/student/checkStudent',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
        },
      );
      if (response.status === 200) {
        const data = await response.json();
        await AsyncStorage.setItem('authData', JSON.stringify(data.data));
        // Proceed with navigation or further processing
        if (Platform.OS === 'android') {
          ToastAndroid.show('Auth successfully', ToastAndroid.SHORT);
        } else {
          AlertIOS.alert('Auth successfully');
        }
        navigation.dispatch(StackActions.replace('Affichage'));
      } else if (response.status === 401) {
        // Invalid username or password
        if (Platform.OS === 'android') {
          ToastAndroid.show('Invalid username or password', ToastAndroid.SHORT);
        } else {
          AlertIOS.alert('Invalid username or password');
        }
        setPassword('');
      } else {
        // Other error occurred

        if (Platform.OS === 'android') {
          ToastAndroid.show('something wrong happend', ToastAndroid.SHORT);
        } else {
          AlertIOS.alert('something wrong happend');
        }
        // Handle the error case
      }
    } catch (error) {
      console.error(error);
      // Handle the error
    }
  };
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
  useEffect(() => {
    const fetchData = async () => {
      const data = await autoAuth();
      if (data) {
        // Extract the username and password from the stored authentication data
        const {nom, matricule} = data;
        setUsername(nom);
        setPassword(matricule);
        setShouldLogin(true);
      }
    };
    // clearLocalStorage();
    fetchData();
    if (username && password) {
      handleLogin();
    }
  }, [shouldLogin]);

  return (
    <View style={{flexGrow: 1, flex: 1}}>
      <ScrollView contentContainerStyle={styles.Container}>
        <View style={styles.UperContainer}>
          <View style={styles.LogInStyle}>
            <View style={styles.LineAbove} />
            <Text style={{color: 'white', fontSize: 24, marginBottom: '15%'}}>
              Log In
            </Text>
          </View>
          <View style={styles.FormCotainer}>
            <View style={styles.InputForm}>
              <Image
                source={require('../assets/user.png')}
                style={styles.ImageInput}
              />
              <View style={styles.lineToTheLeft} />
              <TextInput
                placeholder="Username"
                placeholderTextColor={'gray'}
                value={username}
                onChangeText={text => setUsername(text)}
                style={styles.Input}
              />
            </View>
            <View style={styles.InputForm}>
              <Image
                source={require('../assets/padlock.png')}
                style={styles.ImageInput}
              />
              <View style={styles.lineToTheLeft} />
              <TextInput
                placeholder="Password"
                placeholderTextColor={'gray'}
                secureTextEntry
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.Input}
              />
            </View>
          </View>
          <TouchableOpacity onPress={handleLogin} style={styles.ButtonStyle}>
            <Text style={{color: 'black', fontSize: 20}}>LogIn</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.LowerContainer}>
          <TouchableOpacity
            style={{borderBottomWidth: 1}}
            onPress={() => {
              // navigation.navigate('Login');
            }}>
            <Text>Scan Card</Text>
          </TouchableOpacity>
          <Image source={require('../assets/barcode-scanner.png')} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
  },
  LogInStyle: {
    width: '100%',
    paddingLeft: '6%',
  },
  LineAbove: {
    width: '10%',
    backgroundColor: 'gold',
    height: 2,
    marginTop: '10%',
    marginBottom: '3%',
  },
  UperContainer: {
    height: UpperContainer,
    backgroundColor: '#272C41',
    //
    borderBottomLeftRadius: 300,
    alignItems: 'center',
  },
  FormCotainer: {
    width: '60%',
  },
  InputForm: {
    width: '100%',
    backgroundColor: 'white',
    marginBottom: '30%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '1.5%',
    borderRadius: 15,
    height: Input,
  },
  lineToTheLeft: {
    width: 1,
    height: '70%',
    backgroundColor: 'gray',
    marginRight: 10,
    marginLeft: 10,
  },
  ImageInput: {
    width: 32,
    height: 32,
  },
  Input: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    width: '70%',
    padding: 0,
    color: 'black',
  },
  LowerContainer: {
    height: '15%',
    width: '50%',
    borderTopRightRadius: 200,
    backgroundColor: '#D9D9D9',
    //
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
  },
  ButtonStyle: {
    width: '35%',
    height: '6%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
});

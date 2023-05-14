/*eslint-disable prettier/prettier*/

import React, {useState} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../App';
import {StackNavigationProp} from '@react-navigation/stack';

interface LogInProps {
  onLogin: () => void;
}

const {height} = Dimensions.get('window');

const UpperContainer = height * 0.7;
const Input = height * 0.065;

const Login: React.FC<LogInProps> = ({onLogin}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const handleLogin = () => {
    navigation.navigate('News');
    /*  if (username === 'h1' && password === '123') {
    } */
  };
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

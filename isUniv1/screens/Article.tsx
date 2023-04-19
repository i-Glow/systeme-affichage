/*eslint-disable prettier/prettier*/

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
// import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
/*
TODO: activate it and pass it as a type to prop
import {RootStackParams} from '../App';

type Props = NativeStackScreenProps<RootStackParams, 'Article'>;
*/
export default function Article() {
  /*TODO: id: Props => useEffect => useCallBack => handle the id TO FETCH DATA */
  return (
    <>
      <StatusBar />
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.Container}>
          <Image source={require('../assets/PH1.png')} style={styles.Image} />
          <View style={styles.TextContainer}>
            <Text style={{fontSize: 24, fontWeight: 'bold', color: 'white'}}>
              THERE IS SOME TEXT
            </Text>
            <Text style={{color: 'whitesmoke'}}>9 hours by Admin</Text>
            <Text
              style={{
                fontSize: 18,
                marginTop: 15,
                fontWeight: '500',
                color: 'white',
              }}>
              Reason 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywc
            </Text>
            <Text style={{fontSize: 18, marginTop: 15, color: 'white'}}>
              Object
              1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywcrmpnbkqlabyjvftuwnensbjfmvoyzyqbkexccifneehgxwdopfyyrqyvxcgbiqdwxceojurvqrnziflhdxlcmzkkzpckgufflzdrxvxuvpdretkfbzuibsjeiuurjljidhnlslbrfsdfipywahjhwxakvnixiuelzt
            </Text>

            <View style={styles.Button}>
              <TouchableOpacity
                onPress={() => {
                  /*TODO: tike the use to the desired Link (fp,google,...)*/
                }}>
                <Text style={styles.Link}>Savoir plus</Text>
              </TouchableOpacity>
            </View>
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
  Button: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    marginTop: '8%',
  },
  TextContainer: {
    flex: 1,
    paddingTop: '3.5%',
    paddingLeft: '5%',
    paddingRight: '5%',
    backgroundColor: '#15161d',
  },
  Link: {
    width: 80,
    height: '100%',
    color: 'white',
    backgroundColor: 'blue',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  Image: {
    width: '100%',
    height: '30%',
  },
});

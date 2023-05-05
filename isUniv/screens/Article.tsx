/*eslint-disable prettier/prettier*/

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
// import {NativeStackScreenProps} from '@react-navigation/native-stack';
// import {useRoute} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View, Text} from 'react-native';

export default function Article() {
  // const route = useRoute();
  // const {id} = route.params;
  /*TODO: id: Props => useEffect => useCallBack => handle the id TO FETCH DATA */
  return (
    <>
      <StatusBar />
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.Container}>
          {/* <Image source={require('../assets/PH1.png')} style={styles.Image} /> */}
          <View style={styles.TextContainer}>
            <Text style={styles.title}>THERE IS SOME TEXT</Text>
            <Text style={{color: 'whitesmoke'}}>9 hours by Admin</Text>
            <Text style={styles.Reason}>
              Reason 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywc
            </Text>
            <Text style={styles.Paragh}>
              Object
              1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywcrmpnbkqlabyjvftuwnensbjfmvoyzyqbkexccifneehgxwdopfyyrqyvxcgbiqdwxceojurvqrnziflhdxlcmzkkzpckgufflzdrxvxuvpdretkfbzuibsjeiuurjljidhnlslbrfsdfipywahjhwxakvnixiuelzt
            </Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  Reason: {
    fontSize: 18,
    marginTop: 15,
    fontWeight: '600',
    color: 'white',
  },
  Paragh: {
    fontSize: 16,
    overflow: 'hidden',
    flexShrink: 1,
    marginTop: 15,
    color: 'white',
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

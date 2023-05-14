/*eslint-disable prettier/prettier*/

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
// import {NativeStackScreenProps} from '@react-navigation/native-stack';
// import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View, Text} from 'react-native';
import isArabic from '../utils/isArabic';
export default function Article() {
  // const route = useRoute();
  // const {id} = route.params;
  /*TODO: id: Props => useEffect => useCallBack => handle the id TO FETCH DATA */

  const [isArabicText, setIsArabicText] = useState(false);
  const [Data, setData] = useState([
    {
      id: 1,
      title: 'استدعاء',
      Reason: 'أنا أكرهك',
      Paragh: 'لماذا هذا لا يعمل بشكل صحيح',
      time: '9',
    },
  ]);

  useEffect(() => {
    setIsArabicText(isArabic(Data[0].title));
  }, [Data]);

  return (
    <>
      <StatusBar />
      <SafeAreaView style={{flex: 1}}>
        {Data.map(item => (
          <View style={styles.Container} key={item.id}>
            <View style={styles.TextContainer}>
              <Text
                style={[
                  isArabicText ? {direction: 'rtl'} : {direction: 'ltr'},
                  styles.title,
                ]}>
                {item.title}
              </Text>
              <Text
                style={[
                  isArabicText ? {textAlign: 'right'} : {textAlign: 'left'},
                  styles.Reason,
                ]}>
                {item.time}
              </Text>
              <Text
                style={[
                  isArabicText ? {direction: 'rtl'} : {direction: 'ltr'},
                  styles.Reason,
                ]}>
                {item.Reason}
              </Text>
              <Text
                style={[
                  isArabicText ? {direction: 'rtl'} : {direction: 'ltr'},
                  styles.Paragh,
                ]}>
                {item.Paragh}
              </Text>
            </View>
          </View>
        ))}
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
    color: 'black',
  },
  Reason: {
    fontSize: 18,
    marginTop: 15,
    fontWeight: '600',
    color: 'black',
  },
  Paragh: {
    fontSize: 16,
    overflow: 'hidden',
    flexShrink: 1,
    marginTop: 15,
    color: 'black',
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
    backgroundColor: '#ffffff',
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

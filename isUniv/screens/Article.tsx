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
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import isArabic from '../utils/isArabic';
import {RouteProp, useRoute} from '@react-navigation/native';

type RootStackParamList = {
  Article: {
    title: string;
    Paragh: string;
    time: string;
  };
};

export default function Article() {
  const route = useRoute<RouteProp<RootStackParamList, 'Article'>>();
  const {title, Paragh, time} = route.params;

  const [isArabicText, setIsArabicText] = useState(false);

  useEffect(() => {
    setIsArabicText(isArabic(title));
  }, [title]);
  const linkMatch = Paragh.match(/\[qr:(.*?)\]/);
  const link = linkMatch ? linkMatch[1] : null;
  const NewParagh = Paragh.replace(/\[qr:(.*?)\]/, '');

  const handleLinkPress = (pressedLink: string) => {
    Linking.openURL(pressedLink);
  };

  return (
    <>
      <StatusBar />
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.Container}>
          <View style={styles.TextContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text
              style={[
                isArabicText ? {textAlign: 'right'} : {textAlign: 'left'},
              ]}>
              {isArabicText ? 'قبل ' : ''}
              {time}
            </Text>

            <Text
              style={[
                isArabicText ? {direction: 'rtl'} : {direction: 'ltr'},
                styles.Paragh,
              ]}>
              {NewParagh}
              {link && (
                <TouchableOpacity onPress={() => handleLinkPress(link)}>
                  <Text
                    style={{
                      textDecorationLine: 'underline',
                      color: 'blue',
                    }}>
                    {link}
                  </Text>
                </TouchableOpacity>
              )}
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
    color: 'black',
    textAlign: 'center',
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

/*eslint-disable prettier/prettier*/

import React, {useContext} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Linking,
} from 'react-native';
import NavBar from '../components/NavBar';
import {useFocusEffect} from '@react-navigation/native';
import {BottomBarContext} from '../App';
import isArabic from '../utils/isArabic';
const {height} = Dimensions.get('window');
const BottomBar = height * 0.08;
const contentHeight = height - BottomBar;

export default function News() {
  const {setActiveScreen} = useContext(BottomBarContext);

  useFocusEffect(() => {
    setActiveScreen('News');
  });

  return (
    <>
      <StatusBar />
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.Container}>
          <View style={styles.Container}>
            <FlatList
              data={[]}
              keyExtractor={(item: any) => item.id}
              contentContainerStyle={styles.FlatList}
              scrollEventThrottle={16}
              renderItem={({item}) => {
                const isArabicText = isArabic(item.titre);
                return (
                  <TouchableOpacity
                    onPress={() => {
                      //to send user to facebook or website
                      Linking.openURL('https://www.facebook.com/article-url');
                    }}
                    style={styles.OneArticle}>
                    <Image source={item.image} style={styles.Image} />
                    <View style={styles.TextContainer}>
                      <Text
                        style={[
                          isArabicText
                            ? {textAlign: 'right', writingDirection: 'rtl'}
                            : {textAlign: 'left', writingDirection: 'ltr'},
                          styles.title,
                        ]}>
                        {item.titre}
                      </Text>
                      <Text
                        numberOfLines={16}
                        style={[
                          isArabicText
                            ? {textAlign: 'right', writingDirection: 'rtl'}
                            : {textAlign: 'left', writingDirection: 'ltr'},
                          styles.Paragh,
                        ]}>
                        {item.object}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
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
  TextContainer: {
    padding: '5%',
    textAlign: 'left',
  },
  OneArticle: {
    width: '100%',
    height: contentHeight,
    backgroundColor: 'whitesmoke',
    borderRadius: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },

  Paragh: {
    fontSize: 18,
    marginTop: 15,
    color: 'black',
  },
  Image: {
    width: '100%',
    height: '30%',
  },
  FlatList: {
    backgroundColor: 'white',
  },
});

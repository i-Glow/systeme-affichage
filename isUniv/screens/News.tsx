/*eslint-disable prettier/prettier*/

import React, {useContext, useEffect, useRef, useState} from 'react';
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
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BottomBarContext, RootStackParams} from '../App';
import isArabic from '../utils/isArabic';
const {height} = Dimensions.get('window');
const BottomBar = height * 0.08;
const contentHeight = height - BottomBar - 20;

export default function News() {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const {setActiveScreen} = useContext(BottomBarContext);

  useFocusEffect(() => {
    setActiveScreen('News');
  });

  const Articles = [
    {
      id: 1,
      titre: 'Article1 1phasiuuhqqvnuelzt',
      image: require('../assets/PH1.png'),
      reason: '1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywc',
      object:
        '1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywcrmssssssssssssssssssssssssssssssssssssssssssssssssssssssssssspnbkqlabyjvfsddddddddddddddddddddddddddddsssssssssssssssssssssssssssssssssssssssssssssssssstuwnensbjfmvoyzyqbkexcObject 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywcrmpnbkqlabyjvftuwnensbjfmvoyzyqbkexcObject 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywcrmpnbkqlabyjvftuwnensbjfmvoyzyqbkexcObject 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywcrmpnbkqlabyjvftuwnensbjfmvoyzyqbkexcObject 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywcrmpnbkqlabyjvftuwnensbjfmvoyzyqbkexcObject 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywcrmpnbkqlabyjvftuwnensbjfmvoyzyqbkexccifneehgxwdopfyyrqyvxcgbiqdwxceojurvqrnziflhdxlcmzkkzpckgufflzdrxvxuvpdretkfbzuibsjeiuurjljidhnlslbrfsdfipywahjhwxakvnixiuelzt',
    },
    {
      id: 2,
      titre: 'Article2 1phasiuuhqqvnuelzt',
      image: require('../assets/PH1.png'),
      reason: 'Reason 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywc',
      object:
        'Object 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywcrmpnbkqlabyjvftuwnensbjfmvoyzyqbkexccifneehgxwdopfyyrqyvxcgbiqdwxceojurvqrnziflhdxlcmzkkzpckgufflzdrxvxuvpdretkfbzuibsjeiuurjljidhnlslbrfsdfipywahjhwxakvnixiuelzt',
    },

    {
      id: 3,
      titre: 'Article3 1phasiuuhqqvnuelzt',
      image: require('../assets/PH1.png'),
      reason: 'Reason 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywc',
      object:
        'Object 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywcrmpnbkqlabyjvftuwnensbjfmvoyzyqbkexccifneehgxwdopfyyrqyvxcgbiqdwxceojurvqrnziflhdxlcmzkkzpckgufflzdrxvxuvpdretkfbzuibsjeiuurjljidhnlslbrfsdfipywahjhwxakvnixiuelzt',
    },
    {
      id: 4,
      titre: 'Article4 1phasiuuhqqvnuelzt',
      image: require('../assets/PH1.png'),
      reason: 'Reason 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywc',
      object:
        'Object 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywcrmpnbkqlabyjvftuwnensbjfmvoyzyqbkexccifneehgxwdopfyyrqyvxcgbiqdwxceojurvqrnziflhdxlcmzkkzpckgufflzdrxvxuvpdretkfbzuibsjeiuurjljidhnlslbrfsdfipywahjhwxakvnixiuelzt',
    },

    {
      id: 5,
      titre: 'Article5 1phasiuuhqqvnuelzt',
      image: require('../assets/PH1.png'),
      reason: 'Reason 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywc',
      object:
        'Object 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywcrmpnbkqlabyjvftuwnensbjfmvoyzyqbkexccifneehgxwdopfyyrqyvxcgbiqdwxceojurvqrnziflhdxlcmzkkzpckgufflzdrxvxuvpdretkfbzuibsjeiuurjljidhnlslbrfsdfipywahjhwxakvnixiuelzt',
    },
    {
      id: 6,
      titre: 'Article6 1phasiuuhqqvnuelzt',
      image: require('../assets/PH1.png'),
      reason: 'Reason 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywc',
      object:
        'Object 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywcrmpnbkqlabyjvftuwnensbjfmvoyzyqbkexccifneehgxwdopfyyrqyvxcgbiqdwxceojurvqrnziflhdxlcmzkkzpckgufflzdrxvxuvpdretkfbzuibsjeiuurjljidhnlslbrfsdfipywahjhwxakvnixiuelzt',
    },
    {
      id: 7,
      titre: 'Article7 1phasiuuhqqvnuelzt',
      image: require('../assets/PH1.png'),
      reason: 'Reason 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywc',
      object:
        '1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywcrmpnbkqlabyjvftuwnensbjfmvoyzyqbkexccifneehgxwdopfyyrqyvxcgbiqdwxceojurvqrnziflhdxlcmzkkzpckgufflzdrxvxuvpdretkfbzuibsjeiuurjljidhnlslbrfsdfipywahjhwxakvnixiuelzt',
    },
    {
      id: 8,
      titre: 'Article8 1phasiuuhqqvnuelzt',
      image: require('../assets/PH1.png'),
      reason: 'Reason 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywc',
      object:
        'Object 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywcrmpnbkqlabyjvftuwnensbjfmvoyzyqbkexccifneehgxwdopfyyrqyvxcgbiqdwxceojurvqrnziflhdxlcmzkkzpckgufflzdrxvxuvpdretkfbzuibsjeiuurjljidhnlslbrfsdfipywahjhwxakvnixiuelzt',
    },
  ];

  return (
    <>
      <StatusBar />
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.Container}>
          <View style={styles.Container}>
            <FlatList
              data={Articles}
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
                        style={[
                          isArabicText
                            ? {textAlign: 'right', writingDirection: 'rtl'}
                            : {textAlign: 'left', writingDirection: 'ltr'},
                          styles.Reason,
                        ]}>
                        {item.reason}
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
  Reason: {
    fontSize: 18,
    marginTop: 15,
    fontWeight: '600',
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

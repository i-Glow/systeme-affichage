/*eslint-disable prettier/prettier*/

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,

  // Dimensions,
} from 'react-native';

import NavBar from '../components/NavBar';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../App';

// const screenHeight = Dimensions.get('screen').height;
const Articles = [
  {
    id: 1,
    titre: 'Article 1phasiuuhqqvnuelzt',

    reason: 'Reason 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywc',
    object:
      'Object 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywcrmpnbkqlabyjvftuwnensbjfmvoyzyqbkexcObject 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywcrmpnbkqlabyjvftuwnensbjfmvoyzyqbkexcObject 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywcrmpnbkqlabyjvftuwnensbjfmvoyzyqbkexcObject 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywcrmpnbkqlabyjvftuwnensbjfmvoyzyqbkexcObject 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywcrmpnbkqlabyjvftuwnensbjfmvoyzyqbkexcObject 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywcrmpnbkqlabyjvftuwnensbjfmvoyzyqbkexccifneehgxwdopfyyrqyvxcgbiqdwxceojurvqrnziflhdxlcmzkkzpckgufflzdrxvxuvpdretkfbzuibsjeiuurjljidhnlslbrfsdfipywahjhwxakvnixiuelzt',
  },
  {
    id: 2,
    titre: 'Article 1phasiuuhqqvnuelzt',

    reason: 'Reason 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywc',
    object:
      'Object 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywcrmpnbkqlabyjvftuwnensbjfmvoyzyqbkexccifneehgxwdopfyyrqyvxcgbiqdwxceojurvqrnziflhdxlcmzkkzpckgufflzdrxvxuvpdretkfbzuibsjeiuurjljidhnlslbrfsdfipywahjhwxakvnixiuelzt',
  },

  {
    id: 3,
    titre: 'Article 1phasiuuhqqvnuelzt',
    image: require('../assets/PH1.png'),
    reason: 'Reason 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywc',
    object:
      'Object 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywcrmpnbkqlabyjvftuwnensbjfmvoyzyqbkexccifneehgxwdopfyyrqyvxcgbiqdwxceojurvqrnziflhdxlcmzkkzpckgufflzdrxvxuvpdretkfbzuibsjeiuurjljidhnlslbrfsdfipywahjhwxakvnixiuelzt',
  },
  {
    id: 4,
    titre: 'Article 1phasiuuhqqvnuelzt',
    image: '../assets/PH1.png',
    reason: 'Reason 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywc',
    object:
      'Object 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywcrmpnbkqlabyjvftuwnensbjfmvoyzyqbkexccifneehgxwdopfyyrqyvxcgbiqdwxceojurvqrnziflhdxlcmzkkzpckgufflzdrxvxuvpdretkfbzuibsjeiuurjljidhnlslbrfsdfipywahjhwxakvnixiuelzt',
  },
  /*
  {
    id: 5,
    titre: 'Article 1phasiuuhqqvnuelzt',
    image: '../assets/PH1.png',
    reason: 'Reason 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywc',
    object:
      'Object 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywcrmpnbkqlabyjvftuwnensbjfmvoyzyqbkexccifneehgxwdopfyyrqyvxcgbiqdwxceojurvqrnziflhdxlcmzkkzpckgufflzdrxvxuvpdretkfbzuibsjeiuurjljidhnlslbrfsdfipywahjhwxakvnixiuelzt',
  },
  {
    id: 6,
    titre: 'Article 1phasiuuhqqvnuelzt',
    image: '../assets/PH1.png',
    reason: 'Reason 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywc',
    object:
      'Object 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywcrmpnbkqlabyjvftuwnensbjfmvoyzyqbkexccifneehgxwdopfyyrqyvxcgbiqdwxceojurvqrnziflhdxlcmzkkzpckgufflzdrxvxuvpdretkfbzuibsjeiuurjljidhnlslbrfsdfipywahjhwxakvnixiuelzt',
  },
  {
    id: 7,
    titre: 'Article 1phasiuuhqqvnuelzt',
    image: '../assets/PH1.png',
    reason: 'Reason 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywc',
    object:
      'Object 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywcrmpnbkqlabyjvftuwnensbjfmvoyzyqbkexccifneehgxwdopfyyrqyvxcgbiqdwxceojurvqrnziflhdxlcmzkkzpckgufflzdrxvxuvpdretkfbzuibsjeiuurjljidhnlslbrfsdfipywahjhwxakvnixiuelzt',
  },
  {
    id: 8,
    titre: 'Article 1phasiuuhqqvnuelzt',
    image: require('../assets/PH1.png'),
    reason: 'Reason 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywc',
    object:
      'Object 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywcrmpnbkqlabyjvftuwnensbjfmvoyzyqbkexccifneehgxwdopfyyrqyvxcgbiqdwxceojurvqrnziflhdxlcmzkkzpckgufflzdrxvxuvpdretkfbzuibsjeiuurjljidhnlslbrfsdfipywahjhwxakvnixiuelzt',
  }, */
];

function News() {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Article', item.id);
      }}
      style={styles.OneArticle}>
      <Text style={{fontSize: 24, fontWeight: 'bold'}}>{item.titre}</Text>
      <Text style={{fontSize: 18, marginTop: 15, fontWeight: '600'}}>
        {item.reason}
      </Text>
      <Text numberOfLines={8} style={styles.Paragh}>
        {item.object}
      </Text>
    </TouchableOpacity>
  );

  return (
    <>
      <StatusBar />
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.Container}>
          <View style={styles.CardContainer}>
            <FlatList
              data={Articles}
              renderItem={renderItem}
              keyExtractor={(Article: any) => Article.id}
              contentContainerStyle={styles.FlatList}
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
    backgroundColor: '#030bfc',
    /* height: screenHeight, */
    flex: 1,
    flexGrow: 1,
  },
  Image: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
  },
  CardContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#74e2b2',
  },
  FlatList: {
    alignItems: 'center',
  },
  OneArticle: {
    padding: '5%',
    height: 290,
    width: '90%',
    backgroundColor: '#074757',
    marginTop: '10%',
    borderRadius: 15,
  },
  Paragh: {
    fontSize: 14,
    overflow: 'hidden',
    flexShrink: 1,
    marginTop: 15,
  },
  NavContainer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
    left: 0,
    right: 0,
  },
});

export default News;

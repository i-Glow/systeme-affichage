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
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../App';

// const screenHeight = Dimensions.get('screen').height;
const Articles = [
  {
    id: 1,
    titre: 'Article 1phasiuuhqqvnuelzt',
    time: '6h',
    reason: 'Reason 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywc',
    object:
      'Object 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywcrmpnbkqlabyjvftuwnensbjfmvoyzyqbkexcObject 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywcrmpnbkqlabyjvftuwnensbjfmvoyzyqbkexcObject 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywcrmpnbkqlabyjvftuwnensbjfmvoyzyqbkexcObject 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywcrmpnbkqlabyjvftuwnensbjfmvoyzyqbkexcObject 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywcrmpnbkqlabyjvftuwnensbjfmvoyzyqbkexcObject 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywcrmpnbkqlabyjvftuwnensbjfmvoyzyqbkexccifneehgxwdopfyyrqyvxcgbiqdwxceojurvqrnziflhdxlcmzkkzpckgufflzdrxvxuvpdretkfbzuibsjeiuurjljidhnlslbrfsdfipywahjhwxakvnixiuelzt',
  },
  {
    id: 2,
    titre: 'Article 1phasiuuhqqvnuelzt',
    time: '6h',
    reason: 'Reason 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywc',
    object:
      'Object 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywcrmpnbkqlabyjvftuwnensbjfmvoyzyqbkexccifneehgxwdopfyyrqyvxcgbiqdwxceojurvqrnziflhdxlcmzkkzpckgufflzdrxvxuvpdretkfbzuibsjeiuurjljidhnlslbrfsdfipywahjhwxakvnixiuelzt',
  },

  {
    id: 3,
    titre: 'Article 1phasiuuhqqvnuelzt',
    time: '6h',
    image: require('../assets/PH1.png'),
    reason: 'Reason 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywc',
    object:
      'Object 1phasiuuhqqvnujxivrjtmjnsgxqznuontzzdiywcrmpnbkqlabyjvftuwnensbjfmvoyzyqbkexccifneehgxwdopfyyrqyvxcgbiqdwxceojurvqrnziflhdxlcmzkkzpckgufflzdrxvxuvpdretkfbzuibsjeiuurjljidhnlslbrfsdfipywahjhwxakvnixiuelzt',
  },
  {
    id: 4,
    titre: 'Article 1phasiuuhqqvnuelzt',
    time: '6h',
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
        navigation.navigate('Article', {id: item.id});
      }}
      style={styles.OneArticle}>
      <Text style={styles.title}>{item.titre}</Text>
      <Text style={styles.Reason}>{item.reason}</Text>
      <Text numberOfLines={7} style={styles.Paragh}>
        {item.object}
      </Text>
      <Text style={styles.TimeParagh}>il ya {item.time}</Text>
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
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  Container: {
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
    backgroundColor: 'white',
  },
  FlatList: {
    alignItems: 'center',
  },
  OneArticle: {
    padding: '5%',
    height: 290,
    width: '90%',
    backgroundColor: 'whitesmoke',
    marginTop: '10%',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 20, height: 20},
    shadowOpacity: 0.8,
    shadowRadius: 100,
    elevation: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  Reason: {fontSize: 18, marginTop: 15, fontWeight: '600', color: 'black'},
  Paragh: {
    fontSize: 14,
    overflow: 'hidden',
    flexShrink: 1,
    marginTop: 15,
    color: 'black',
  },
  TimeParagh: {
    flex: 1,
    position: 'absolute',
    right: 15,
    bottom: 8,
  },

  /* NavContainer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
    left: 0,
    right: 0,
  }, */
});

export default News;

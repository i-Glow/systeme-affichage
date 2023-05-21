/*eslint-disable prettier/prettier*/

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../App';
import isArabic from '../utils/isArabic';

const {width, height} = Dimensions.get('window');
const item_width = width * 0.9;
const item_height = height * 0.4;
function News() {
  const [affichage, setAffichage] = useState([]);

  useEffect(() => {
    fetch('http://192.168.43.137:8080/api/affichage/mobile?level=')
      // fetch('https://api.sampleapis.com/coffee/hot')
      .then(res => res.json())
      .then(data => setAffichage(data))
      .catch(error => {
        console.error('Error:', error.message);
      });
  }, []);

  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const renderItem = ({item}: any) => {
    const isArabicText = isArabic(item.titre);

    const currentTime = new Date().getTime();
    const createdAtTime = new Date(item.created_at).getTime();
    const timeDiff = currentTime - createdAtTime;
    const minutesDiff = Math.floor(timeDiff / (1000 * 60));
    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    let timeMessage = '';
    if (daysDiff > 0) {
      timeMessage = `${daysDiff} ${isArabicText ? 'أيام' : 'days ago'}`;
    } else if (hoursDiff > 0) {
      timeMessage = `${hoursDiff} ${isArabicText ? 'ساعات' : 'hours ago'} `;
    } else {
      timeMessage = `${minutesDiff} ${isArabicText ? 'دقائق' : 'minutes ago'} `;
    }
    const linkMatch = item.contenu.match(/\[qr:(.*?)\]/);
    const link = linkMatch ? linkMatch[1] : null;
    const NewParagh = item.contenu.replace(/\[qr:(.*?)\]/, '');
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Article', {
            title: item.titre,
            Paragh: item.contenu,
            time: timeMessage,
          });
        }}
        style={styles.OneArticle}>
        <Text style={styles.title}>{item.titre}</Text>
        <Text
          numberOfLines={10}
          style={[
            isArabicText ? {textAlign: 'right'} : {textAlign: 'left'},
            styles.Paragh,
          ]}>
          {NewParagh}
          {link && (
            <Text
              style={{
                textDecorationLine: 'underline',
                color: 'blue',
              }}>
              {' '}
              {link}
            </Text>
          )}
        </Text>
        <Text
          style={[
            isArabicText ? {textAlign: 'right'} : {textAlign: 'left'},
            styles.TimeParagh,
          ]}>
          {isArabicText ? 'قبل' : ''} {timeMessage}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <StatusBar />
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.Container}>
          <View style={styles.CardContainer}>
            <FlatList
              data={affichage.reverse()}
              renderItem={renderItem}
              keyExtractor={(affichage: any) => affichage.article_id}
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
    height: item_height,
    width: item_width,
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
    textAlign: 'center',
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

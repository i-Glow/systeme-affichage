/*eslint-disable prettier/prettier*/

import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SuppotStackParams} from '../App';
import {StackNavigationProp} from '@react-navigation/stack';

const {height} = Dimensions.get('window');
const ItemHeight = height * 0.06;
export default function Testimonial() {
  const SupportCarts = [
    {
      id: 1,
      titre: 'good conduct',
    },
    {
      id: 2,
      titre: 'teaching in the French language',
    },
    {
      id: 3,
      titre: 'graduation',
    },
  ];
  const navigation = useNavigation<StackNavigationProp<SuppotStackParams>>();

  return (
    <>
      <StatusBar />
      <SafeAreaView style={{flex: 1, flexGrow: 1}}>
        <View style={styles.Container}>
          <FlatList
            data={SupportCarts}
            keyExtractor={(item: any) => item.id}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('TicketPage', {
                    type: item.titre,
                  });
                }}
                style={styles.SupportCard}>
                <Text style={styles.SupportTextOption}>{item.titre}</Text>
                <Image
                  source={require('../assets/next.png')}
                  style={styles.Image}
                />
              </TouchableOpacity>
            )}
          />
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
  SupportCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',

    height: ItemHeight,
    borderBottomWidth: 0.5,
    borderColor: 'black',
    paddingLeft: '2%',
    paddingRight: '2%',
    alignItems: 'center',
  },
  SupportTextOption: {
    color: 'black',
    fontSize: 20,
  },
  Image: {width: 26, height: 26},
});

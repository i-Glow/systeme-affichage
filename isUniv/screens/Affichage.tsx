/*eslint-disable prettier/prettier*/

import React from 'react';
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Affichage() {
  return (
    <>
      <StatusBar />
      <SafeAreaView style={{flex: 1}}>
        <Text>HEAR ME OUT</Text>
      </SafeAreaView>
    </>
  );
}

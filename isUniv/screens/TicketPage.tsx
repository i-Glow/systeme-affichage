/*eslint-disable prettier/prettier*/

import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function TicketPage() {
  const route = useRoute();
  const {type}: {type: string} = route.params;

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: type, // Set the title of the header to the passed in title
    });
  }, [type, navigation]);
  return (
    <>
      <StatusBar />
      <SafeAreaView style={{flex: 1, flexGrow: 1}}>
        <View style={styles.Container}>
          <Text style={styles.StyleText}>
            So you want to do the{' '}
            <Text style={{fontWeight: 'bold'}}>{type}</Text> please Validate
            your choise By Submiting on the Button
          </Text>
          <Text>Note:in case you do this as a joke you will be called</Text>

          <TouchableOpacity style={styles.ButtonStyle}>
            <Text style={{color: 'white', fontSize: 16}}>Create a Ticket</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexGrow: 1,
    padding: '2%',
  },
  StyleText: {
    color: 'black',
    fontSize: 20,
    marginBottom: 15,
  },
  ButtonStyle: {
    marginTop: 15,
    backgroundColor: '#e13333ef',
    width: '30%',
    height: 40,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
});

/*eslint-disable prettier/prettier*/
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {WebView} from 'react-native-webview';
import Geolocation from '@react-native-community/geolocation';
import HtmlScript from '../utils/HtmlScript';
import NavBar from '../components/NavBar';

type Position = {
  lat: number;
  lon: number;
  description: string;
};

type Event = {
  lat: number;
  lon: number;
  description: string;
  time: number;
};

function Map() {
  Geolocation.requestAuthorization();
  const mapRef = useRef<WebView>(null);
  /* const [Place, setPlace] = useState([]);
  const [Evenment, setEvenment] = useState([]); */

  const [oneTime, setOneTime] = useState(false);
  const [update, setUpdate] = useState(false);
  const [userLocation, setUserLocation] = useState({
    lat: 0,
    lon: 0,
    description: 'current Poistion',
  });
  const createMark = useCallback(({lat, lon, description}: Position) => {
    if (mapRef && mapRef.current) {
      mapRef.current.injectJavaScript(`
        L.marker([${lat}, ${lon}])
          .addTo(map)
          .bindPopup('${description}')
      `);
    } else {
      console.error('mapRef is null or undefined');
    }
  }, []);

  const createEvent = useCallback(({lat, lon, description, time}: Event) => {
    const icons = [
      {
        iconUrl:
          'https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn-icons-png.flaticon.com%2F512%2F64%2F64665.png&tbnid=qz_12728_WgfMM&vet=12ahUKEwjyi-WMyoH-AhXvnCcCHdIJDTYQMygGegUIARDTAQ..i&imgrefurl=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Flocation-mark_64665&docid=-_YqYtv2vrG10M&w=512&h=512&q=icon%20mark&ved=2ahUKEwjyi-WMyoH-AhXvnCcCHdIJDTYQMygGegUIARDTAQ',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      },
      {
        iconUrl:
          'https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.icon-icons.com%2Ficons2%2F1509%2FPNG%2F512%2Fmarklocation_104204.png&tbnid=PPd8lYY9af-uoM&vet=12ahUKEwjyi-WMyoH-AhXvnCcCHdIJDTYQMygdegUIARCPAg..i&imgrefurl=https%3A%2F%2Ficon-icons.com%2Ficon%2Fmark-location%2F104205&docid=wa-X1AXCZVQ37M&w=512&h=512&q=icon%20mark&ved=2ahUKEwjyi-WMyoH-AhXvnCcCHdIJDTYQMygdegUIARCPAg',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      },
      {
        iconUrl:
          'https://www.google.com/imgres?imgurl=https%3A%2F%2Fimg.freepik.com%2Ffree-icon%2Fplaceholder-outline-with-check-mark_318-47177.jpg&tbnid=_myJ2dDYQBrmdM&vet=12ahUKEwjyi-WMyoH-AhXvnCcCHdIJDTYQMyhAegQIARBi..i&imgrefurl=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fmark-icon&docid=0eNB0u9sedQHiM&w=626&h=626&q=icon%20mark&ved=2ahUKEwjyi-WMyoH-AhXvnCcCHdIJDTYQMyhAegQIARBi',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      },
    ];
    let iconIndex;
    if (time === 5) {
      iconIndex = 0;
    } else if (time === 10) {
      iconIndex = 1;
    } else {
      iconIndex = 2;
    }
    if (mapRef.current) {
      mapRef.current.injectJavaScript(`
        L.marker([${lat}, ${lon}], {icon: L.icon({iconUrl: '${icons[iconIndex].iconUrl}', iconSize: [${icons[iconIndex].iconSize}], iconAnchor: [${icons[iconIndex].iconAnchor}], popupAnchor: [${icons[iconIndex].popupAnchor}]})})
        .addTo(map)
        .bindPopup('${description}')
        
      `);
    }
  }, []);

  const createUserLocationMarker = useCallback(
    ({lat, lon, description}: Position) => {
      // go to userLocation
      if (mapRef && mapRef.current) {
        mapRef.current.injectJavaScript(`
      map.flyTo([${lat}, ${lon}], 16)
      `);
        // update & create a marker for the user's current location
        mapRef.current.injectJavaScript(`
      L.marker([${lat}, ${lon}],{className: 'user-location-marker'})
        .addTo(map)
        .bindPopup('${description}')
        .openPopup();
    `);
      } else {
        console.error('mapRef is null or undefined');
      }
    },
    [],
  );

  const updateUserLocationMarker = useCallback(
    ({lat, lon, description}: Position) => {
      // go to userLocation
      if (mapRef && mapRef.current) {
        /* mapRef.current.injectJavaScript(`
      map.setView([${lat}, ${lon}], 16)
      `); */

        //remove the old marker
        mapRef.current.injectJavaScript(`
        const existingMarkers = document.querySelectorAll('.user-location-marker');
        existingMarkers.forEach(marker => marker.remove());
        `);
        // update & create a marker for the user's current location
        /*  mapRef.current.injectJavaScript(`
      L.marker([${lat}, ${lon}],{className: 'user-location-marker'})
        .addTo(map)
        .bindPopup('${description}')
    `); */
      } else {
        console.error('mapRef is null or undefined');
      }
    },
    [],
  );

  useEffect(() => {
    const places = [
      {lat: 36.812725, lon: 7.719596, description: 'bloc H'},
      {lat: 36.812764, lon: 7.719027, description: 'bloc J'},
      {lat: 36.813889, lon: 7.717983, description: 'Department Informatique'},
    ];
    const evenment = [
      {lat: 36.912, lon: 7.8195, description: 'this is ', time: 5},
      {lat: 36.912, lon: 7.819, description: 'this is ', time: 10},
      {lat: 36.813, lon: 7.8179, description: 'this is ', time: 15},
    ];
    places.forEach(place => {
      createMark(place);
    });
    evenment.forEach(event => {
      createEvent(event);
    });

    //36.238103 6.584361

    if (oneTime) {
      Geolocation.getCurrentPosition(
        position => {
          const User = {...userLocation};
          User.lat = position.coords.latitude;
          User.lon = position.coords.longitude;
          setUserLocation(User);
          createUserLocationMarker(userLocation);
          setOneTime(false);
        },
        error => {
          console.error(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        },
      );
    }

    if (update) {
      const watchId = Geolocation.watchPosition(
        position => {
          console.log(position);
          const User = {...userLocation};
          User.lat = position.coords.latitude;
          User.lon = position.coords.longitude;
          setUserLocation(User);
          updateUserLocationMarker(userLocation);
        },
        error => console.log(error),
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 1000,
        },
      );

      return () => {
        // stop watching the user's location when the component unmounts
        Geolocation.clearWatch(watchId);
      };
    }
  }, [
    createMark,
    createEvent,
    createUserLocationMarker,
    userLocation,
    oneTime,
    update,
    updateUserLocationMarker,
  ]);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.Container}>
        <WebView
          ref={mapRef}
          source={{html: HtmlScript}}
          style={styles.Webview}
          allowFileAccess={true}
        />
        <Button
          title="Get My Location"
          onPress={() => {
            setOneTime(true);
            setUpdate(true);
          }}
        />
        <View style={styles.NavContainer}>
          <NavBar />
        </View>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'gray',
  },
  Webview: {
    height: 100,
    width: 500,
  },
  NavContainer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
    left: 0,
    right: 0,
  },
});
export default Map;

/*eslint-disable prettier/prettier*/
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Button, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import HtmlScript from '../utils/HtmlScript';

type Position = {
  latitude: number;
  longitude: number;
  name: string;
};

type Event = {
  latitude: number;
  longitude: number;
  description: string;
  name: string;
  endDate: string;
};

// ask & get userPermision
export async function requestLocationPermission() {
  try {
    Geolocation.requestAuthorization();
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'IsUniv',
        message: 'Allow IsUniv to access your location ?',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // console.log('You can use the location');
      // alert('You can use the location');
    } else {
      console.log('location permission denied');
      alert('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

export default function Map() {
  // ask for userPermision
  useEffect(() => {
    async function getLocationPermission() {
      await requestLocationPermission();
    }
    getLocationPermission();
  }, []);

  const mapRef = useRef<WebView>(null);

  const [oneTime, setOneTime] = useState(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    fetch('http://192.168.43.137:8080/api/map/bloc')
      // fetch('https://api.sampleapis.com/coffee/hot')
      .then(res => res.json())
      .then(data => setPlaces(data))
      .catch(error => {
        console.error('Error:', error.message);
      });
    fetch('http://192.168.43.137:8080/api/map/event')
      // fetch('https://api.sampleapis.com/coffee/hot')
      .then(res => res.json())
      .then(data => setEvenment(data))
      .catch(error => {
        console.error('Error:', error.message);
      });
  }, []);

  const [places, setPlaces] = useState([]);
  /* {lat: 36.812725, lon: 7.719596, description: 'bloc H'},
    {lat: 36.812764, lon: 7.719027, description: 'bloc J'},
    {lat: 36.813889, lon: 7.717983, description: 'Department Informatique'},  {lat: 36.813299, lon: 7.718092, description: 'this is A', time: 5},
    {lat: 36.813455, lon: 7.718817, description: 'this is B', time: 10},
    {lat: 36.813085, lon: 7.719302, description: 'this is C', time: 15},*/
  const [evenment, setEvenment] = useState([]);
  const [userLocation, setUserLocation] = useState({
    lat: 0,
    lon: 0,
    description: 'current Poistion',
  });

  const createMark = useCallback(({latitude, longitude, name}: Position) => {
    if (mapRef && mapRef.current) {
      mapRef.current.injectJavaScript(`
        L.marker([${latitude}, ${longitude}])
          .addTo(map)
          .bindPopup('${name}');
      `);
    } else {
      console.error('mapRef is null or undefined');
    }
  }, []);

  const createEvent = useCallback(
    ({latitude, longitude, description, name, endDate}: Event) => {
      const icons = [
        {
          iconUrl: 'https://cdn-icons-png.flaticon.com/512/2558/2558944.png',
          iconSize: [30, 30],
          iconAnchor: [20, 40],
          popupAnchor: [0, 0],
        },
        {
          iconUrl: 'https://cdn-icons-png.flaticon.com/512/2558/2558944.png',
          iconSize: [30, 30],
          iconAnchor: [20, 40],
          popupAnchor: [0, 0],
        },
        {
          iconUrl: 'https://cdn-icons-png.flaticon.com/512/2558/2558944.png',
          iconSize: [30, 30],
          iconAnchor: [20, 40],
          popupAnchor: [0, 0],
        },
      ];
      const limitTime: Date = new Date(endDate);
      const currentDate: Date = new Date();
      const timeDiff: number = Math.ceil(
        (limitTime.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24),
      ); // Calculate the difference in days

      let iconIndex;
      if (timeDiff < 1) {
        iconIndex = 0;
      } else if (timeDiff <= 3) {
        iconIndex = 1;
      } else {
        iconIndex = 2;
      }

      if (mapRef.current) {
        mapRef.current.injectJavaScript(`
        L.marker([${latitude}, ${longitude}], {icon: L.icon({iconUrl: '${
          icons[iconIndex].iconUrl
        }', iconSize: [${icons[iconIndex].iconSize}], iconAnchor: [${
          icons[iconIndex].iconAnchor
        }], popupAnchor: [${icons[iconIndex].popupAnchor}]})})
        .addTo(map)
        .bindPopup('${name + '/n ' + description}')
      `);
      }
    },
    [],
  );

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
        //  update & create a marker for the user's current location
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
  //57.74, 11.94 36.814016, 7.720433
  //<link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.css" />
  //<script src="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js"></script>

  /* function CreateRoute() {
    if (mapRef && mapRef.current) {
      mapRef.current.injectJavaScript(`
      L.Routing.control({
        waypoints: [
          L.latLng(36.813425 , 7.720508),
          L.latLng(36.81693 , 7.712022)
        ]
        }).addTo(map);
    }  
      `);
    }  */
  const [mapReady, setMapReady] = useState(false);

  const onMapReady = useCallback(() => {
    setMapReady(true);
  }, []);

  useEffect(() => {
    if (!mapReady) {
      return;
    }
    if (places && Array.isArray(places)) {
      places.forEach(place => {
        createMark(place);
      });
    }
    if (places && Array.isArray(evenment)) {
      evenment.forEach(event => {
        createEvent(event);
      });
    }

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
    createEvent,
    createMark,
    createUserLocationMarker,
    evenment,
    mapReady,
    oneTime,
    places,
    update,
    updateUserLocationMarker,
    userLocation,
  ]);

  return (
    <>
      <StatusBar />
      <SafeAreaView style={styles.Container}>
        <WebView
          ref={mapRef}
          source={{html: HtmlScript}}
          style={styles.Webview}
          allowFileAccess={true}
          onLoadEnd={onMapReady}
        />
        {/* <Button
          title="Get My Location"
          onPress={() => {
            setOneTime(true);
            setUpdate(true);
          }}
        /> */}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexGrow: 1,
  },
  Webview: {
    flex: 1,
    flexGrow: 1,
  },
});

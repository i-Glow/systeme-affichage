/*eslint-disable prettier/prettier*/
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import HtmlScript from '../utils/HtmlScript';
import {ToastAndroid, Platform} from 'react-native';

type Position = {
  latitude: number;
  longitude: number;
  description: string;
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
      // @ts-ignore
      {
        title: 'IsUniv',
        message: 'Allow IsUniv to access your location ?',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    } else {
      // @ts-ignore
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
      .then(res => res.json())
      .then(data => setPlaces(data))
      .catch(error => {
        console.error('Error:', error.message);
      });
    fetch('http://192.168.43.137:8080/api/map/event')
      .then(res => res.json())
      .then(data => setEvenment(data))
      .catch(error => {
        console.error('Error:', error.message);
      });
  }, []);

  const [places, setPlaces] = useState([]);

  const [evenment, setEvenment] = useState([]);
  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
    description: 'current Poistion',
  });

  /* const mapContainer = map.getContainer();
const latLng = L.latLng(latitude, longitude);
const layerPoint = map.latLngToLayerPoint(latLng);

// Create a custom HTML element for the text
const customElement = L.DomUtil.create('div', 'map-text');
customElement.innerHTML = description;

// Set the position of the custom element using CSS styles
customElement.style.position = 'absolute';
customElement.style.left = ${layerPoint.x}px;
customElement.style.top = ${layerPoint.y}px;

// Add the custom element to the map container
mapContainer.appendChild(customElement); 

  const marks = L.marker([${latitude}, ${longitude}])
          ;
        marks.bindTooltip("text here", { permanent: true, offset: [0, 12] }).addTo(map);
*/
  const createMark = useCallback(({latitude, longitude, name}: Position) => {
    if (mapRef && mapRef.current) {
      const htmlString = <div>${name}</div>;
      mapRef.current.injectJavaScript(`
        const customIcon = L.divIcon({
          className: 'custom-icon',
          html: '${htmlString}'
        });

        L.marker([${latitude}, ${longitude}], { icon: customIcon })
          .addTo(map);
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
    ({latitude, longitude, description}: Position) => {
      // go to userLocation
      if (mapRef && mapRef.current) {
        mapRef.current.injectJavaScript(`
        map.flyTo([${latitude}, ${longitude}], 16)
      `);
        // create a marker for the user's current location
        mapRef.current.injectJavaScript(`
       let marker = L.marker([${latitude}, ${longitude}])
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
    ({latitude, longitude, description}: Position) => {
      // go to userLocation
      if (mapRef && mapRef.current) {
        /* mapRef.current.injectJavaScript(`
      map.setView([${lat}, ${lon}], 16)
      `); */

        //remove the old marker
        mapRef.current.injectJavaScript(`
          map.removeLayer(marker);
        `);

        //  update & create a marker for the user's current location
        mapRef.current.injectJavaScript(`
        marker = L.marker([${latitude}, ${longitude}])
        .addTo(map)
        .bindPopup('${description}')
    `);
      } else {
        console.error('mapRef is null or undefined');
      }
    },
    [],
  );

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
      console.log(places);
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
          User.latitude = position.coords.latitude;
          User.longitude = position.coords.longitude;

          setUserLocation(User);
          setUpdate(true);

          createUserLocationMarker(User);
        },
        error => {
          console.error(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        },
      );
      setOneTime(false);
    }

    if (update) {
      const watchId = Geolocation.watchPosition(
        position => {
          const User = {...userLocation};
          User.latitude = position.coords.latitude;
          User.longitude = position.coords.longitude;
          setUserLocation(User);
          updateUserLocationMarker(userLocation);
        },
        error => {
          if (error.code === 1) {
            if (Platform.OS === 'android') {
              ToastAndroid.show(
                'please allow gealocation access',
                ToastAndroid.SHORT,
              );
            }
          } else {
            if (Platform.OS === 'android') {
              ToastAndroid.show(
                'can not get current location',
                ToastAndroid.SHORT,
              );
            }
          }
          console.log(error);
        },
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
        <TouchableOpacity style={styles.Route} onPress={() => {}}>
          <Image source={require('../assets/emplacementWhite.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Position}
          onPress={() => {
            setOneTime(true);
          }}>
          <Image source={require('../assets/emplacement.png')} />
        </TouchableOpacity>
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
  Position: {
    position: 'absolute',
    right: 10,
    bottom: 120,
    backgroundColor: 'white',
    width: 85,
    height: 85,
    borderRadius: 360,
    padding: 8,
  },
  Route: {
    position: 'absolute',
    width: 85,
    height: 85,
    right: 10,
    bottom: 20,
    backgroundColor: 'blue',
    borderRadius: 15,
    padding: 8,
  },
});

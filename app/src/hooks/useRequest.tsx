import Geolocation from '@react-native-community/geolocation';
import {useEffect, useRef} from 'react';
import {Alert, Platform} from 'react-native';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import WebView from 'react-native-webview';
import {mapStore} from 'store/Store';

const webViewRef = useRef<WebView>(null);
const {setWebViewRef} = mapStore();
export const useRequest = async () => {
  let result;
  if (Platform.OS === 'android') {
    result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  }
  if (result === RESULTS.GRANTED) {
    const Ids = Geolocation.watchPosition(
      position => {
        const {coords} = position;
        const message = {
          type: 'location',
          payload: {
            latitude: coords.latitude,
            longitude: coords.longitude,
          },
        };

        if (webViewRef.current) {
          webViewRef.current.postMessage(JSON.stringify(message));
        }
      },
      error => {
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
    return Ids;
  } else {
    Alert.alert('위치 권한이 필요합니다!', '위치 권한을 켜주세요!', [
      {
        text: 'OK',
        onPress: () => useRequest(),
      },
    ]);
  }
};

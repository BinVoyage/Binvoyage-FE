import {Text, View, Alert, Platform, StyleSheet} from 'react-native';
import {WebView, WebViewMessageEvent} from 'react-native-webview';
import {useEffect, useRef, useState} from 'react';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import {mapStore} from 'store/Store';

export default function FindBin() {
  const {setWebViewRef, setAddressList} = mapStore();
  const webViewRef = useRef<WebView>(null);

  const URL =
    Platform.OS === 'android'
      ? 'http://192.168.35.143:5173'
      : 'http://localhost:5173';

  // const Permission: any = useRequest();
  // 분리하기

  const requestPermission = async () => {
    let result;
    if (Platform.OS === 'android') {
      result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    } else if (Platform.OS === 'ios') {
      result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
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
          onPress: () => requestPermission(),
        },
      ]);
    }
  };

  useEffect(() => {
    setWebViewRef(webViewRef);
  }, [webViewRef]);

  useEffect(() => {
    const Ids = requestPermission();

    return () => {
      if (typeof Ids === 'number') {
        Geolocation.clearWatch(Ids);
      }
    };
  }, []);

  const handleMessage = (e: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(e.nativeEvent.data);
      if (data.type === 'address') {
        setAddressList(data.payload.addressList);
      }
    } catch (err) {
      console.log('error');
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        style={styles.webview}
        source={{uri: URL}}
        javaScriptEnabled={true}
        onMessage={handleMessage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

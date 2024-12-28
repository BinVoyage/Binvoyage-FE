import MyBottomSheet from 'components/MyBottomSheet';
import React, {useEffect, useRef, useState} from 'react';
import {Platform, Alert, StyleSheet, View, Image, TouchableOpacity, Dimensions, Text} from 'react-native';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import {mapStore} from 'store/Store';
import * as S from 'screens/reportNewBin/ReportNewBin.style';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import LocationSvg from 'assets/images/LocationSvg';
import {Palette} from 'constants/palette';
import StickyNotification from 'components/StickyNotification';
import api from 'api/api';
import ArrowPrevSvg from 'assets/images/ArrowPrevSvg';

export default function ReportNewBin() {
  const webViewRef = useRef<WebView>(null);
  const {startWatchingPosition, stopWatchingPosition, setCurrentPosition, setCenterPosition} = mapStore();
  const [isWebViewLoaded, setIsWebViewLoaded] = useState<boolean>(false); // WebView 로드 상태
  const [bottomSheetOffset, setBottomSheetOffset] = useState<number>(0); // BottomSheet의 높이 또는 offset 상태
  const URL = 'https://binvoyage.netlify.app/reportNewBin';
  // const URL = 'https://feature-38--binvoyage.netlify.app/reportNewBin';
  const alertShown = useRef(false);
  const navigation = useNavigation<NavigationProp<RootReportNewBinParamList>>();
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(null);
  const [address, setAddress] = useState<string>('');

  const refreshWrapperBottom = bottomSheetOffset > 0 ? bottomSheetOffset + 10 : 40;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      bottom: withTiming(refreshWrapperBottom, {duration: 300}), // 애니메이션 추가
    };
  }, [refreshWrapperBottom]);

  const requestPermissionAndSendLocation = async () => {
    let result;
    if (Platform.OS === 'android') {
      result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    } else if (Platform.OS === 'ios') {
      result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    }

    if (result === RESULTS.GRANTED) {
      startWatchingPosition(position => {
        const message = {
          type: 'location',
          payload: {
            latitude: position.latitude,
            longitude: position.longitude,
          },
        };
        console.log('Sending message to WebView:', JSON.stringify(message));
        if (isWebViewLoaded && webViewRef.current) {
          webViewRef.current?.postMessage(JSON.stringify(message));
          // setTimeout(() => {
          //   webViewRef.current?.postMessage(JSON.stringify(message));
          // }, 500); // 0.5초 지연
        }
      });
    } else {
      if (!alertShown.current) {
        // alertShown이라는 ref 변수를 사용해 두 번 호출 방지
        Alert.alert(
          'Location Permission Needed',
          'We need your location permission to provide information about nearby bins. Please enable location permissions in Settings.',
        );
        alertShown.current = true;
      }
      const message = {
        type: 'location',
        payload: {
          latitude: undefined,
          longitude: undefined,
        },
      };
      console.log('Sending message to WebView:', JSON.stringify(message));
      if (isWebViewLoaded && webViewRef.current) {
        setTimeout(() => {
          webViewRef.current?.postMessage(JSON.stringify(message));
        }, 500); // 0.5초 지연
      }
      setCurrentPosition({
        latitude: 37.571648599,
        longitude: 126.976372775,
      });
    }
  };

  useEffect(() => {
    if (isWebViewLoaded) {
      requestPermissionAndSendLocation();
    }

    return () => {
      stopWatchingPosition(); // 컴포넌트가 언마운트될 때만 위치 추적을 중지
    };
  }, [isWebViewLoaded]);

  const refreshLocationWatching = () => {
    // 기존의 위치 감시 중지
    // if (watcherId !== null) {
    //   Geolocation.clearWatch(watcherId);
    // }
    // // 새로 위치 감시 시작
    // requestPermissionAndSendLocation();

    if (webViewRef.current) {
      const message = {
        type: 'refresh',
      };
      // 메시지가 잘 전송되었는지 확인하기 위한 로그
      console.log('Sending message to WebView:', JSON.stringify(message));

      webViewRef.current.postMessage(JSON.stringify(message));
    } else {
      // WebView ref가 null일 때의 로그
      console.log('WebView reference is null, message not sent.');
    }
  };

  const handleMessage = (e: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(e.nativeEvent.data);
      if (data.type === 'newBinPoint') {
        console.log('newBinPoint:', data.payload.latitude, data.payload.longitude);
        convertAddress(data.payload.latitude, data.payload.longitude);
        setMarkerPosition([data.payload.latitude, data.payload.longitude]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const convertAddress = async (lat: number, lng: number) => {
    try {
      const response = await api.get(`/bin/address?lat=${lat}&lng=${lng}`);
      if (response.data.success) {
        const result = response.data.data.address;
        const trimmedAddress = result.split(', Seoul, South Korea')[0];
        setAddress(trimmedAddress);
      } else {
        console.log('convert address failed');
      }
    } catch (error) {
      console.log('convert address Error: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <StickyNotification content="The red dots show where the bins already are!" />
      <S.Header>
        <S.ArrowPrevWrapper onPress={() => navigation.goBack()}>
          <ArrowPrevSvg width="9" height="16" fill={Palette.Gray3} />
        </S.ArrowPrevWrapper>
      </S.Header>
      <WebView
        ref={webViewRef}
        style={styles.webview}
        source={{uri: URL}}
        javaScriptEnabled={true}
        domStorageEnabled={true} // DOM 저장소 사용
        cacheMode={'LOAD_CACHE_ELSE_NETWORK'} // 캐시 우선 로딩
        onMessage={handleMessage}
        onLoadStart={() => setIsWebViewLoaded(false)} // 로딩 시작
        onLoadEnd={() => setIsWebViewLoaded(true)} // 로딩 완료/>
      />
      <Animated.View style={[styles.refresh, animatedStyle]}>
        <TouchableOpacity onPress={refreshLocationWatching}>
          <Image source={require('assets/images/icon-refresh.png')} style={{width: 60, height: 60}} />
        </TouchableOpacity>
      </Animated.View>
      <MyBottomSheet onSheetChange={setBottomSheetOffset} wrapperStyle={{paddingHorizontal: 16}}>
        <View style={styles.view}>
          <S.AddressWrapper>
            <LocationSvg width="24" height="24" fill={Palette.Primary} />
            <S.TextAddress>{address}</S.TextAddress>
          </S.AddressWrapper>
          <S.Button
            onPress={() =>
              navigation.navigate('ReportNewBinDetail', {
                address,
                coordinate: markerPosition,
              })
            }>
            <S.ButtonText>There’s a bin here!</S.ButtonText>
          </S.Button>
        </View>
      </MyBottomSheet>
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
  view: {
    flex: 1,
    justifyContent: 'space-between',
  },
  refresh: {
    position: 'absolute',
    right: 16,
    width: 60,
    height: 60,
  },
  search: {
    display: 'none',
    position: 'absolute',
    alignSelf: 'center',
  },
  visible: {
    display: 'flex',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // 로딩 중 배경을 반투명하게 설정
  },
});

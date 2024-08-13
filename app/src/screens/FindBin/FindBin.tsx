import {View, Alert, Platform, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {WebView, WebViewMessageEvent} from 'react-native-webview';
import {useEffect, useRef, useState} from 'react';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import * as S from 'screens/FindBin/FindBin.style';
import LocationSvg from 'assets/images/LocationSvg';
import {Palette} from 'constants/palette';
import RecyclingFilterSvg from 'assets/images/RecyclingFilterSvg';
import TrashFilterSvg from 'assets/images/TrashFilterSvg';
import {Image} from 'react-native';
import MyBottomSheet from 'components/MyBottomSheet';
import Carousel from 'react-native-snap-carousel';
import BinItem from 'components/binItem/BinItem';
import EmptyItem from 'components/binItem/EmptyItem';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {NativeViewGestureHandler} from 'react-native-gesture-handler';
import {useIsFocused} from '@react-navigation/native';
import api from 'api/api';
import {useStore} from 'store/Store';

export default function FindBin() {
  const webViewRef = useRef<WebView>(null);
  const [filterMode, setFilterMode] = useState<number>(-1);
  const [currentAddress, setCurrentAddress] = useState<string>('');
  const [watcherId, setWatcherId] = useState<number | null>(null); // Watcher ID를 저장할 상태
  const [isWebViewLoaded, setIsWebViewLoaded] = useState<boolean>(false); // WebView 로드 상태
  const [bottomSheetOffset, setBottomSheetOffset] = useState<number>(0); // BottomSheet의 높이 또는 offset 상태
  const [isSearchShow, setIsSearchShow] = useState<boolean>(false);
  const carouselRef = useRef(null);
  const [data, setData] = useState<BinItemProps[]>([]);
  const {currentPosition, setCurrentPosition} = useStore();

  const isFocused = useIsFocused();

  const {width, height} = Dimensions.get('window');
  const refreshWrapperBottom = bottomSheetOffset > 0 ? bottomSheetOffset + 10 : 40;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      bottom: withTiming(refreshWrapperBottom, {duration: 300}), // 애니메이션 추가
    };
  }, [refreshWrapperBottom]);

  const URL = 'https://binvoyage.netlify.app/';
  // const URL = 'http://localhost:5173/';

  const requestPermissionAndSendLocation = async () => {
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
              // latitude: coords.latitude,
              // longitude: coords.longitude,
              latitude: 37.563685889,
              longitude: 126.975584404,
            },
          };
          if (currentPosition === null) {
            /* 애뮬레이터 테스트용 */
            // setCurrentPosition({latitude: coords.latitude, longitude: coords.longitude});
            setCurrentPosition({latitude: 37.563685889, longitude: 126.975584404});
          }

          console.log('Sending message:', JSON.stringify(message)); // 메시지 전송 확인

          if (isWebViewLoaded && webViewRef.current) {
            setTimeout(() => {
              // 지연을 주고 메시지 전송
              webViewRef.current?.postMessage(JSON.stringify(message));
            }, 500); // 0.5초 지연
          }
        },
        error => {
          console.log(error);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 10},
      );
      setWatcherId(Ids); // Watcher ID를 상태로 저장
    } else {
      Alert.alert('위치 권한이 필요합니다!', '위치 권한을 켜주세요!', [
        {
          text: 'OK',
          onPress: () => requestPermissionAndSendLocation(),
        },
      ]);
    }
  };

  useEffect(() => {
    if (isFocused && isWebViewLoaded) {
      requestPermissionAndSendLocation();
    } else {
      // 다른 페이지로 이동한 경우 위치 감지를 중지
      if (watcherId !== null) {
        Geolocation.clearWatch(watcherId);
        setWatcherId(null);
      }
    }

    return () => {
      if (!isFocused && watcherId !== null) {
        Geolocation.clearWatch(watcherId);
        setWatcherId(null);
      }
    };
  }, [isFocused, isWebViewLoaded]);

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
      if (data.type === 'address') {
        setCurrentAddress(data.payload.address);
      } else if (data.type === 'centerMoved') {
        setIsSearchShow(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sendSearchMessage = () => {
    if (webViewRef.current) {
      const message = {
        type: 'search',
      };
      // 메시지가 잘 전송되었는지 확인하기 위한 로그
      // console.log('Sending message to WebView:', JSON.stringify(message));

      webViewRef.current.postMessage(JSON.stringify(message));
    } else {
      // WebView ref가 null일 때의 로그
      console.log('WebView reference is null, message not sent.');
    }
  };

  const sendModeMessage = (mode: number) => {
    if (webViewRef.current) {
      const message = {
        type: 'filter',
        payload: {
          filterMode: mode,
        },
      };

      // 메시지가 잘 전송되었는지 확인하기 위한 로그
      // console.log('Sending message to WebView:', JSON.stringify(message));

      webViewRef.current.postMessage(JSON.stringify(message));
    } else {
      // WebView ref가 null일 때의 로그
      console.log('WebView reference is null, message not sent.');
    }
  };

  const handleFilter = (mode: number) => {
    if (filterMode === mode) {
      setFilterMode(-1);
      sendModeMessage(-1);
      return;
    }
    setFilterMode(mode);
    sendModeMessage(mode);
  };

  const renderItem = ({item}: {item: BinItemProps}) => <BinItem item={item} />;
  const itemWidth = (width / 375) * 232;
  const itemSpacing = 16; // 슬라이드 간 간격 설정

  useEffect(() => {
    console.log('currentPositon:' + currentPosition?.latitude, currentPosition?.longitude);
    const getData = async () => {
      try {
        const response = await api.get(`/bin/search?lat=${currentPosition?.latitude}&lng=${currentPosition?.longitude}&radius=2000&filter=0`);

        if (response.status === 200) {
          setData(response.data.data.bin_list);
        } else {
          console.log('실패 ㅜㅜ');
        }
      } catch (error: any) {
        console.log(error.response.data);
      }
    };

    if (currentPosition) {
      console.log('get data!!!');
      getData();
    }
  }, [currentPosition]);

  useEffect(() => {
    console.log(data.length);
  }, [data]);

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        style={styles.webview}
        originWhitelist={['http://*', 'https://*', 'intent://*']}
        source={{uri: URL}}
        javaScriptEnabled={true}
        onMessage={handleMessage}
        onLoad={() => {
          console.log('WebView loaded');
          setIsWebViewLoaded(true); // WebView 로드 상태를 true로 설정
        }}
      />
      <S.ItemWrapper>
        <S.LocationWrapper>
          <LocationSvg width="24" height="24" fill={Palette.Primary} />
          <S.LocationText>{currentAddress || 'loading...'}</S.LocationText>
        </S.LocationWrapper>
        <S.RowWrapper>
          <S.FilterWrapperNoIcon onPress={() => handleFilter(0)} isSelected={filterMode === 0} isTrash={false}>
            <S.FilterText isSelected={filterMode === 0}>Recently visited</S.FilterText>
          </S.FilterWrapperNoIcon>
          <S.FilterWrapper onPress={() => handleFilter(2)} isSelected={filterMode === 2} isTrash={false}>
            <RecyclingFilterSvg width="26" height="26" fill={Palette.Primary} />
            <S.FilterText isSelected={filterMode === 2}>Recycling</S.FilterText>
          </S.FilterWrapper>
          <S.FilterWrapper onPress={() => handleFilter(1)} isSelected={filterMode === 1} isTrash={true}>
            <TrashFilterSvg width="26" height="26" fill={Palette.Secondary2} />
            <S.FilterText isSelected={filterMode === 1}>Trash</S.FilterText>
          </S.FilterWrapper>
        </S.RowWrapper>
      </S.ItemWrapper>
      <Animated.View style={[styles.refresh, animatedStyle]}>
        <TouchableOpacity onPress={refreshLocationWatching}>
          <Image source={require('assets/images/icon-refresh.png')} style={{width: 60, height: 60}} />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.search, animatedStyle, isSearchShow ? styles.visible : null]}>
        <S.BtnSearchThisArea onPress={sendSearchMessage}>
          <S.TextSearchThisArea>Search this area</S.TextSearchThisArea>
        </S.BtnSearchThisArea>
      </Animated.View>

      <MyBottomSheet onSheetChange={setBottomSheetOffset}>
        {data.length ? (
          <NativeViewGestureHandler disallowInterruption={true}>
            <Carousel
              ref={carouselRef}
              data={data}
              renderItem={renderItem}
              sliderWidth={width}
              itemWidth={itemWidth + itemSpacing}
              inactiveSlideScale={1}
              inactiveSlideOpacity={1}
              firstItem={0} // 첫번째 아이템이 슬라이더의 왼쪽에 위치하도록 설정
              activeSlideAlignment="start" // 슬라이드가 왼쪽 정렬되도록 설정
            />
          </NativeViewGestureHandler>
        ) : (
          <EmptyItem />
        )}
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
  View: {
    flex: 1,
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
});

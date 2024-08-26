import {View, Alert, Platform, StyleSheet, Dimensions, TouchableOpacity, ImageBackground, ActivityIndicator} from 'react-native';
import {WebView, WebViewMessageEvent} from 'react-native-webview';
import {useEffect, useRef, useState} from 'react';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';
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
import {mapStore} from 'store/Store';
import BinBottomSheet from 'components/binBottomSheet/BinBottomSheet';
import {useBackHandler} from 'hooks/useBackHandler';

export default function FindBin() {
  useBackHandler();
  const webViewRef = useRef<WebView>(null);
  const [filterMode, setFilterMode] = useState<number>(0);
  const [currentAddress, setCurrentAddress] = useState<string>('');
  const [isWebViewLoaded, setIsWebViewLoaded] = useState<boolean>(false); // WebView 로드 상태
  const [bottomSheetOffset, setBottomSheetOffset] = useState<number>(0); // BottomSheet의 높이 또는 offset 상태
  const [isSearchShow, setIsSearchShow] = useState<boolean>(false);
  const carouselRef = useRef(null);
  const [data, setData] = useState<BinItemProps[]>([]);
  const currentPosition = mapStore(state => state.currentPosition);
  const {startWatchingPosition, stopWatchingPosition, setCurrentPosition} = mapStore();
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const alertShown = useRef(false);

  // const isFocused = useIsFocused();

  const {width, height} = Dimensions.get('window');
  const refreshWrapperBottom = bottomSheetOffset > 0 ? bottomSheetOffset + 10 : 40;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      bottom: withTiming(refreshWrapperBottom, {duration: 300}), // 애니메이션 추가
    };
  }, [refreshWrapperBottom]);

  const URL = 'https://test--binvoyage.netlify.app/';
  // const URL = 'http://localhost:5173/';

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

  const getData = async () => {
    try {
      const response = await api.get(`/bin/search?lat=${currentPosition?.latitude}&lng=${currentPosition?.longitude}&radius=1000&filter=${filterMode}`);

      if (response.status === 200) {
        setData(response.data.data.bin_list);
      } else {
        console.log('실패 ㅜㅜ');
      }
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    if (currentPosition?.latitude && currentPosition.longitude) {
      console.log('currentPositon:' + currentPosition?.latitude, currentPosition?.longitude);
      console.log('get data!!!');

      getData();
    }
  }, [currentPosition, filterMode]);

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
      } else if (data.type === 'markerClick') {
        console.log('click: ', data.payload.bin_id);
        setSelectedMarker(data.payload.bin_id);
      } else if (data.type === 'mapClick') {
        setSelectedMarker(null);
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
      console.log('Sending message to WebView:', JSON.stringify(message));

      webViewRef.current.postMessage(JSON.stringify(message));
    } else {
      // WebView ref가 null일 때의 로그
      console.log('WebView reference is null, message not sent.');
    }
  };

  const handleFilter = (mode: number) => {
    if (filterMode === mode) {
      setFilterMode(0);
      sendModeMessage(0);
      return;
    }
    setFilterMode(mode);
    sendModeMessage(mode);
  };

  const renderItem = ({item}: {item: BinItemProps}) => <BinItem item={item} />;
  const itemWidth = (width / 375) * 232;
  const itemSpacing = 16; // 슬라이드 간 간격 설정

  return (
    <View style={styles.container}>
      {/* {!isWebViewLoaded && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={Palette.P100} />
        </View>
      )} */}
      <WebView
        ref={webViewRef}
        style={styles.webview}
        source={{uri: URL}}
        javaScriptEnabled={true}
        domStorageEnabled={true} // DOM 저장소 사용
        cacheMode={'LOAD_CACHE_ELSE_NETWORK'} // 캐시 우선 로딩
        onMessage={handleMessage}
        onLoadStart={() => setIsWebViewLoaded(false)} // 로딩 시작
        onLoadEnd={() => setIsWebViewLoaded(true)} // 로딩 완료
      />
      <S.ItemWrapper>
        <S.LocationWrapper>
          <LocationSvg width="24" height="24" fill={Palette.Primary} />
          <S.LocationText>{currentAddress || 'loading...'}</S.LocationText>
        </S.LocationWrapper>
        <S.RowWrapper>
          {/* <S.FilterWrapperNoIcon onPress={() => handleFilter(0)} isSelected={filterMode === 0} isTrash={false}>
            <S.FilterText isSelected={filterMode === 0}>Recently visited</S.FilterText>
          </S.FilterWrapperNoIcon> */}
          <S.FilterWrapper onPress={() => handleFilter(2)} isSelected={filterMode === 2} isTrash={false}>
            <RecyclingFilterSvg width="26" height="26" fill={Palette.Primary} />
            <S.FilterText isSelected={filterMode === 2}>Recycling</S.FilterText>
          </S.FilterWrapper>
          <S.FilterWrapper onPress={() => handleFilter(1)} isSelected={filterMode === 1} isTrash={true}>
            <ImageBackground source={require('assets/images/icon-filter-trash.png')} style={{width: 26, height: 26}} />
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

      {selectedMarker ? null : (
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
      )}

      {selectedMarker && <BinBottomSheet bin_id={selectedMarker} onSheetChange={setBottomSheetOffset} />}
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

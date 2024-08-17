import Geolocation from '@react-native-community/geolocation';
import {NavigationProp, RouteProp, useIsFocused, useNavigation} from '@react-navigation/native';
import api from 'api/api';
import ArrowPrevSvg from 'assets/images/ArrowPrevSvg';
import BinSvg from 'assets/images/BinSvg';
import ModalFailed from 'components/modalVerifyVisit/ModalFailed';
import ModalStamp from 'components/modalVerifyVisit/ModalStamp';
import ModalSuccess from 'components/modalVerifyVisit/ModalSuccess';
import {Palette} from 'constants/palette';
import {useEffect, useRef, useState} from 'react';
import {Alert, Platform, ScrollView} from 'react-native';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import * as S from 'screens/verifyVisit/VerifyVisit.style';

type VerifyVisitProps = {
  route: RouteProp<RootBinDetailParamList, 'VerifyVisit'>;
};

export default function VerifyVisit({route}: VerifyVisitProps) {
  const {bin_id, type_name, location_type_name, address, detail, image, coordinate} = route.params;
  const navigation = useNavigation<NavigationProp<RootBinDetailParamList>>();
  const [isValid, setIsValid] = useState<boolean>(false);
  const [titleMessage, setTitleMessage] = useState<string>(`Get closer to the bin to verify\nyour visit!`);
  const [modalSuccess, setModalSuccess] = useState<boolean>(false);
  const [modalFailed, setModalFailed] = useState<boolean>(false);
  const [modalStamp, setModalStamp] = useState<boolean>(false);
  const webViewRef = useRef<WebView>(null);
  const [watcherId, setWatcherId] = useState<number | null>(null); // Watcher ID를 저장할 상태
  const [isWebViewLoaded, setIsWebViewLoaded] = useState<boolean>(false); // WebView 로드 상태
  const [currentLocation, setCurrentLocation] = useState<CurrentPosition | null>(null);

  const URL = 'https://binvoyage.netlify.app/verify';

  const requestPermissionAndSendLocation = async () => {
    console.log('requestPermissionAndSendLocation called');
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
          setCurrentLocation({latitude: coords.latitude, longitude: coords.latitude});
          const message = {
            type: 'verify',
            payload: {
              latitude: coords.latitude,
              longitude: coords.longitude,
              bin_lat: coordinate[1],
              bin_lng: coordinate[0],
              // latitude: 37.563685889,
              // longitude: 126.975584404,
              // bin_lat: 37.568677620456,
              // bin_lng: 126.977657083792,
            },
          };

          console.log('Location updated:', coords); // 위치 정보 로그 출력
          console.log('Sending message:', JSON.stringify(message)); // 메시지 전송 확인

          if (isWebViewLoaded && webViewRef.current) {
            setTimeout(() => {
              // 지연을 주고 메시지 전송
              webViewRef.current?.postMessage(JSON.stringify(message));
            }, 500); // 0.5초 지연
          }
        },
        error => {
          console.log('Error in watchPosition:', error); // 에러 로그 출력
        },
        {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000, distanceFilter: 10},
      );
      console.log('Watcher ID set:', Ids); // Watcher ID 설정 확인
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
    console.log('useEffect triggered:', {isWebViewLoaded}); // useEffect 트리거 로그
    if (isWebViewLoaded && watcherId === null) {
      requestPermissionAndSendLocation();
    }

    return () => {
      console.log('Component unmounted, clearing watcher if exists'); // 언마운트 로그
      if (watcherId !== null) {
        Geolocation.clearWatch(watcherId);
        setWatcherId(null);
      }
    };
  }, [isWebViewLoaded, watcherId]);

  useEffect(() => {
    if (isValid) {
      setTitleMessage(`You’ve arrived! Did you\nsuccessfully find the bin?`);
      return;
    }
    setTitleMessage(`Get closer to the bin to verify\nyour visit!`);
  }, [isValid]);

  const handleReportIssue = async () => {
    try {
      const response = await api.post(`/bin/visit/${bin_id}`, {
        lat: currentLocation?.latitude,
        lng: currentLocation?.longitude,
        is_visit: false,
      });
    } catch (error: any) {
      if (error.response) {
        const statusCode = error.response.status;
        if (statusCode === 400 || statusCode === 403 || statusCode === 404) {
          console.log('로그인이 필요합니다.' + statusCode);
        } else {
          console.log('방문인증을 이미 하셨습니다.');
        }
      } else {
        Alert.alert('에러 발생', `${error.message}`);
      }
    }
  };

  const handleStampModal = async (isVisit: boolean) => {
    try {
      const response = await api.post(`/bin/visit/${bin_id}`, {
        lat: currentLocation?.latitude,
        lng: currentLocation?.longitude,
        is_visit: true,
      });
      if (response.data.code === 32013) {
        isVisit ? setModalSuccess(false) : setModalFailed(false);
        setModalStamp(true);
      } else {
        console.log(response.data.code);
      }
    } catch (error: any) {
      if (error.response) {
        const statusCode = error.response.status;
        if (statusCode === 400 || statusCode === 403 || statusCode === 404) {
          console.log('로그인이 필요합니다.' + statusCode);
        } else {
          console.log('방문인증을 이미 하셨습니다.');
        }
      } else {
        Alert.alert('에러 발생', `${error.message}`);
      }
    }
  };

  const handleMessage = (e: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(e.nativeEvent.data);
      console.log('Message received from WebView:', data); // WebView로부터 메시지 수신 로그
      if (data.type === 'proximity') {
        setIsValid(data.payload.within50m);
      }
    } catch (err) {
      console.log('Error parsing message from WebView:', err); // 파싱 에러 로그
    }
  };

  return (
    <>
      <S.Container>
        <S.ArrowPrevWrapper onPress={() => navigation.goBack()}>
          <ArrowPrevSvg width="24" height="24" fill={Palette.Gray4} />
        </S.ArrowPrevWrapper>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false} style={{marginBottom: 28}}>
          <S.RowWrapper style={{gap: 2}}>
            <BinSvg width="18" height="18" fill={type_name === 'Trash' ? Palette.Secondary2 : Palette.Primary} />
            <S.TextInfoB1>{type_name}</S.TextInfoB1>
          </S.RowWrapper>
          <S.Title>{titleMessage}</S.Title>
          <S.AddressWrapper>
            <S.TextInfoB3>{address}</S.TextInfoB3>
          </S.AddressWrapper>
          {image ?? <S.ImageArea />}
          <S.DetailWrapper style={{marginBottom: 16}}>
            <S.RowWrapper style={{justifyContent: 'flex-start'}}>
              <S.TextLocation>Location details</S.TextLocation>
              <S.LabelLocation>
                <S.LabelLocationText>{location_type_name}</S.LabelLocationText>
              </S.LabelLocation>
            </S.RowWrapper>
            <S.TextLocationContents>{detail}</S.TextLocationContents>
          </S.DetailWrapper>
          <S.WebViewContainer>
            <WebView
              ref={webViewRef}
              style={{width: '100%', height: '100%', borderRadius: 10}}
              originWhitelist={['http://*', 'https://*', 'intent://*']}
              source={{uri: URL}}
              javaScriptEnabled={true}
              onMessage={handleMessage}
              nestedScrollEnabled={true}
              onLoadEnd={() => {
                console.log('WebView loaded');
                setIsWebViewLoaded(true);
              }}
            />
            {!isWebViewLoaded && <S.TextWebViewLoading>isLoading...</S.TextWebViewLoading>}
          </S.WebViewContainer>
        </ScrollView>
        <S.BtnContainer>
          <S.Button isPrimary isValid={isValid} disabled={!isValid} onPress={() => setModalSuccess(true)}>
            <S.ButtonText isValid={isValid}>Found it!</S.ButtonText>
          </S.Button>
          <S.Button isValid={isValid} disabled={!isValid} onPress={() => setModalFailed(true)}>
            <S.ButtonText isValid={isValid}>Can't find it</S.ButtonText>
          </S.Button>
        </S.BtnContainer>
      </S.Container>
      {modalSuccess ? <ModalSuccess bin_id={bin_id} address={address} coordinate={coordinate} handleStampModal={handleStampModal} /> : null}
      {modalFailed ? <ModalFailed handleReportIssue={handleReportIssue} handleStampModal={handleStampModal} /> : null}
      {modalStamp ? <ModalStamp /> : null}
    </>
  );
}

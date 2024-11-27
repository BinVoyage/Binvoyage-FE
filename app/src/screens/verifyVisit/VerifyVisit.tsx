import {NavigationProp, RouteProp, useNavigation} from '@react-navigation/native';
import api from 'api/api';
import ArrowPrevSvg from 'assets/images/ArrowPrevSvg';
import BinSvg from 'assets/images/BinSvg';
import ModalFailed from 'components/modalVerifyVisit/ModalFailed';
import ModalStamp from 'components/modalVerifyVisit/ModalStamp';
import ModalSuccess from 'components/modalVerifyVisit/ModalSuccess';
import {Palette} from 'constants/palette';
import {useEffect, useRef, useState} from 'react';
import {Alert, ScrollView} from 'react-native';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import * as S from 'screens/verifyVisit/VerifyVisit.style';
import {mapStore} from 'store/Store';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import analytics from '@react-native-firebase/analytics';


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
  const [isWebViewLoaded, setIsWebViewLoaded] = useState<boolean>(false); // WebView 로드 상태
  const {startWatchingPosition, stopWatchingPosition} = mapStore();
  const currentPosition = mapStore(state => state.currentPosition);

  const URL = 'https://binvoyage.netlify.app/verify';

  useEffect(() => {
    startWatchingPosition();

    return () => {
      stopWatchingPosition();
    };
  }, []);

  useEffect(() => {
    if (isWebViewLoaded && currentPosition) {
      const message = {
        type: 'verify',
        payload: {
          latitude: currentPosition.latitude,
          longitude: currentPosition.longitude,
          bin_lat: coordinate[1],
          bin_lng: coordinate[0],
        },
      };

      setTimeout(() => {
        // 지연을 주고 메시지 전송
        webViewRef.current?.postMessage(JSON.stringify(message));
        console.log('Sending message:', JSON.stringify(message)); // 메시지 전송 확인
      }, 500); // 0.5초 지연
    }
  }, [isWebViewLoaded, currentPosition]);

  useEffect(() => {
    if (isValid) {
      setTitleMessage(`You’ve arrived! Did you\nsuccessfully find the bin?`);
      return;
    }
    setTitleMessage(`Get closer to the bin to verify\nyour visit!`);
  }, [isValid]);

  const handleFoundIt = async () => {
    try {
      const storedTime = await AsyncStorage.getItem('navigationExitTime'); // 이전에 길찾기로 앱을 이탈했던 시각
      if (storedTime) {
        const exitTime = parseInt(storedTime, 10);
        const currentTime = Date.now();
        const diffInMinutes = (currentTime - exitTime) / 1000 / 60; // 분 단위로 계산

        const returnedWithin30Minutes = diffInMinutes <= 30;
        // Google Analytics 이벤트 로깅
        await analytics().logEvent('visit_verification_success', {
          returned_within_30_minutes: returnedWithin30Minutes,
          duration_since_exit_minutes: Math.floor(diffInMinutes),
        });

        await AsyncStorage.removeItem('navigationExitTime'); // 길찾기로 앱 이탈했던 시각 초기화
      }

      const response = await api.post(`/bin/visit/${bin_id}`, {
        lat: currentPosition?.latitude,
        lng: currentPosition?.longitude,
        is_visit: true,
      });
      if (response.data.success) {
        setModalSuccess(true);
      } else {
        console.log('Response failed:', response.data);
        Toast.show({
          type: 'error',
          text1: 'Failed to verify visit. Please try again later.',
          position: 'bottom',
          bottomOffset: 100,
          visibilityTime: 2000,
        });
      }
    } catch (error: any) {
      if (error.response) {
        const statusCode = error.response.status;
        if (statusCode === 403) {
          console.log('로그인이 필요합니다.' + statusCode);
          Toast.show({
            type: 'error',
            text1: 'Login required. Please log in from the My Page to continue.',
            position: 'bottom',
            bottomOffset: 100,
            visibilityTime: 2000,
          });
        } else {
          console.log('방문인증을 이미 하셨습니다.' + statusCode);
          Toast.show({
            type: 'error',
            text1: 'You have already completed today.',
            position: 'bottom',
            bottomOffset: 100,
            visibilityTime: 2000,
          });
        }
      } else {
        Alert.alert('에러 발생', `${error.message}`);
      }
    }
  };

  const handleCantFoundIt = async () => {
    try {
      const storedTime = await AsyncStorage.getItem('navigationExitTime'); // 이전에 길찾기로 앱을 이탈했던 시각
      if (storedTime) {
        const exitTime = parseInt(storedTime, 10);
        const currentTime = Date.now();
        const diffInMinutes = (currentTime - exitTime) / 1000 / 60; // 분 단위로 계산

        const returnedWithin30Minutes = diffInMinutes <= 30;
        // Google Analytics 이벤트 로깅
        await analytics().logEvent('visit_verification_failed', {
          returned_within_30_minutes: returnedWithin30Minutes,
          duration_since_exit_minutes: diffInMinutes,
        });
      }

      const response = await api.post(`/bin/visit/${bin_id}`, {
        lat: currentPosition?.latitude,
        lng: currentPosition?.longitude,
        is_visit: false,
      });
      if (response.data.success) {
        setModalFailed(true);
      } else {
        console.log('Response failed:', response.data);
        Toast.show({
          type: 'error',
          text1: 'Failed to verify visit. Please try again later.',
          position: 'bottom',
          bottomOffset: 100,
          visibilityTime: 2000,
        });
      }
    } catch (error: any) {
      if (error.response) {
        const statusCode = error.response.status;
        if (statusCode === 403) {
          console.log('로그인이 필요합니다.' + statusCode);
          Toast.show({
            type: 'error',
            text1: 'Login required. Please log in from the My Page to continue.',
            position: 'bottom',
            bottomOffset: 100,
            visibilityTime: 2000,
          });
        } else {
          console.log('방문인증을 이미 하셨습니다.');
          Toast.show({
            type: 'error',
            text1: 'You have already completed today.',
            position: 'bottom',
            bottomOffset: 100,
            visibilityTime: 2000,
          });
        }
      } else {
        Alert.alert('에러 발생', `${error.message}`);
      }
    }
  };

  const handleReportIssue = () => {
    navigation.navigate('ReportWrongInfo', {
      bin_id: bin_id,
      type_name: type_name,
      location_type_name: location_type_name,
      address: address,
      detail: detail,
      image: image,
      isVerifyVisit: true,
    });
  };

  const handleStampModal = () => {
    setModalSuccess(false);
    setModalFailed(false);
    setModalStamp(true);
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
          <ArrowPrevSvg width="9" height="16" fill={Palette.Gray4} />
        </S.ArrowPrevWrapper>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false} style={{marginBottom: 28}}>
          <S.RowWrapper style={{gap: 2}}>
            <BinSvg width="18" height="18" fill={type_name === 'Trash' ? Palette.Secondary2 : Palette.Primary} />
            <S.TextInfoB1>{type_name}</S.TextInfoB1>
          </S.RowWrapper>
          <S.Title>{titleMessage}</S.Title>
          <S.AddressWrapper>
            <S.TextInfoB3 numberOfLines={1} ellipsizeMode="tail">{address}</S.TextInfoB3>
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
          <S.Button isPrimary isValid={isValid} disabled={!isValid} onPress={handleFoundIt}>
            <S.ButtonText isValid={isValid}>Found it!</S.ButtonText>
          </S.Button>
          <S.Button isValid={isValid} disabled={!isValid} onPress={handleCantFoundIt}>
            <S.ButtonText isValid={isValid}>Can't find it</S.ButtonText>
          </S.Button>
        </S.BtnContainer>
      </S.Container>
      {modalSuccess ? (
        <ModalSuccess
          bin_id={bin_id}
          address={address}
          coordinate={coordinate}
          handleStampModal={handleStampModal}
          setModalSuccess={setModalSuccess}
        />
      ) : null}
      {modalFailed ? <ModalFailed handleReportIssue={handleReportIssue} handleStampModal={handleStampModal} /> : null}
      {modalStamp ? <ModalStamp /> : null}
    </>
  );
}


import * as S from 'components/modalOpenMap/ModalOpenMap.style';
import {Alert, Image, Linking, Platform, TouchableOpacity} from 'react-native';

interface Props {
  setIsModalOpen: (value: boolean) => void;
  coords: [number, number] | undefined;
}

export default function ModalMap({setIsModalOpen, coords}: Props) {
  const openNaverMap = () => {
    const [latitude, longitude] = coords ?? [37.563685889, 126.975584404];
    const label = 'Destination'; // 목적지의 레이블
    const appname = 'com.binvoyage.app';

    const url = `nmap://place?lat=${latitude}&lng=${longitude}&name=${label}&appname=${appname}`;
    const storeUrl = Platform.select({
      ios: 'https://apps.apple.com/kr/app/naver-map-navigation/id311867728', // 네이버 지도 앱스토어 링크
      android: 'market://details?id=com.nhn.android.nmap', // 네이버 지도 플레이스토어 링크
    });

    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          if (storeUrl) {
            Alert.alert('네이버지도가 설치되어 있지 않습니다.', '스토어로 이동하여 앱을 설치하시겠습니까?', [
              {text: '취소', style: 'cancel'},
              {text: '확인', onPress: () => Linking.openURL(storeUrl)},
            ]);
          }
        }
      })
      .catch(err => console.error('Error opening map:', err));
  };

  const openKakaoMap = () => {
    const [latitude, longitude] = coords ?? [37.563685889, 126.975584404];

    const url = `kakaomap://look?p=${latitude},${longitude}`;
    const storeUrl = Platform.select({
      ios: 'https://apps.apple.com/kr/app/kakaomap/id304608425', // 카카오맵 앱스토어 링크
      android: 'market://details?id=net.daum.android.map', // 카카오맵 플레이스토어 링크
    });

    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          if (storeUrl) {
            Alert.alert('카카오맵이 설치되어 있지 않습니다.', '스토어로 이동하여 앱을 설치하시겠습니까?', [
              {text: '취소', style: 'cancel'},
              {text: '확인', onPress: () => Linking.openURL(storeUrl)},
            ]);
          }
        }
      })
      .catch(err => console.error('Error opening map:', err));
  };
  return (
    <S.Background activeOpacity={1} onPress={() => setIsModalOpen(false)}>
      <S.Container>
        <S.Title>Choose a navigation app</S.Title>
        <S.RowWrapper>
          <TouchableOpacity onPress={openNaverMap}>
            <Image
              source={require('assets/images/naver.png')} // 이미지 경로를 올바르게 지정합니다.
              style={{width: 56, height: 56}} // 스타일 속성으로 크기를 지정합니다.
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={openKakaoMap}>
            <Image
              source={require('assets/images/kakao.png')} // 이미지 경로를 올바르게 지정합니다.
              style={{width: 56, height: 56}} // 스타일 속성으로 크기를 지정합니다.
            />
          </TouchableOpacity>
        </S.RowWrapper>
      </S.Container>
    </S.Background>
  );
}

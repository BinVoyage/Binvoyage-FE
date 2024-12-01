import {NavigationProp, useNavigation} from '@react-navigation/native';
import * as S from 'components/modalVerifyVisit/ModalVerifyVisit.style';
import {Image} from 'react-native';
import LottieView from 'lottie-react-native';

export default function ModalStamp() {
  const navigation = useNavigation<NavigationProp<RootTabParamList>>();
  let animation;
  return (
    <S.Background>
      <S.Container>
        <S.Title>Thanks for your BinVoyage!</S.Title>
        <S.TextAddress>New stamp added!</S.TextAddress>
        <LottieView
          // ref={animation => {
          //   this.animation = animation;
          // }}
          source={require('assets/images/stamp/stamp_lottie.json')} // 애니메이션 파일 경로
          autoPlay
          loop={false}
          style={{width: 181, height: 176}}
        />
        {/* <Image source={require('assets/images/img-verify-stamp.png')} style={{width: 181, height: 176}} /> */}
        <S.TextB1>Check your passport in HOME</S.TextB1>
        <S.Button isPrimary onPress={() => navigation.navigate('HomeNavigator', {screen: 'Home'})}>
          <S.ButtonText isPrimary>Okay!</S.ButtonText>
        </S.Button>
      </S.Container>
    </S.Background>
  );
}

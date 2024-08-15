import {NavigationProp, useNavigation} from '@react-navigation/native';
import api from 'api/api';
import ArrowNextSvg from 'assets/images/ArrowNextSvg';
import {Palette} from 'constants/palette';
import {useEffect, useState} from 'react';
import * as S from 'screens/home/Home.style';
import {userStore} from 'store/Store';

export default function Home() {
  const navigation1 = useNavigation<NavigationProp<RootTabParamList>>();
  const navigation2 = useNavigation<NavigationProp<RootHomeParamList>>();
  const {userInfo, setUserInfo} = userStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get('/user');

        if (response.data.success) {
          setUserInfo(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  return (
    <S.Container>
      <S.Inner bounces={false}>
        <S.TopWrapper>
          {isLoading ? (
            <S.HeaderTitle>isLoading...</S.HeaderTitle>
          ) : userInfo?.user_name ? (
            <S.HeaderTitle>{`${userInfo?.user_name}, Start your BinVoyage!`}</S.HeaderTitle>
          ) : (
            <S.HeaderTitle>{`User, Start your BinVoyage!`}</S.HeaderTitle>
          )}
          <S.Bridge onPress={() => navigation1.navigate('FindBin')}>
            <S.BridgeIconWrapper source={require('assets/images/icon-trash-wrapper.png')} resizeMode="contain">
              {/* <HomeTrashSvg width="40" height="66" /> */}
              <S.BridgeIcon source={require('assets/images/icon-home-trash2x.png')} resizeMode="contain" />
            </S.BridgeIconWrapper>
            <S.BridgeTextWrapper source={require('assets/images/icon-text-wrapper.png')} resizeMode="stretch">
              <S.BridgeText>{`Struggling to find bins? 😓\nThere’s one just 350m away!`}</S.BridgeText>
            </S.BridgeTextWrapper>
          </S.Bridge>
        </S.TopWrapper>

        <S.Body>
          <S.BodyTitle>{`Collect Seoul\nstamps during BinVoyage`}</S.BodyTitle>
          <S.BodyDescription>Stamp varies by the bin location.</S.BodyDescription>
          <S.PassPortBg>
            <S.ArrowNextWrapper onPress={() => navigation2.navigate('PassPort')}>
              <ArrowNextSvg width="9" height="16" fill={Palette.Gray4} />
            </S.ArrowNextWrapper>
            <S.PassPort>
              <S.PassPortTitle>PASSPORT</S.PassPortTitle>
              <S.ImagePassPort source={require('assets/images/img-passport.png')} resizeMode="contain" />
              <S.PassPortSubTitle>{`TO THE BINVOYAGE\nIN SEOUL`}</S.PassPortSubTitle>
              <S.IconPassPort source={require('assets/images/icon-passport.png')} resizeMode="contain" />
            </S.PassPort>
          </S.PassPortBg>
          {/* <S.Button>
          <S.ButtonText>Find any new bin? Let us know!</S.ButtonText>
        </S.Button> */}
        </S.Body>
      </S.Inner>
    </S.Container>
  );
}

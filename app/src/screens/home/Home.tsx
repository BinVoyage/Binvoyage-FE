import {NavigationProp, useNavigation} from '@react-navigation/native';
import api from 'api/api';
import {useBackHandler} from 'hooks/useBackHandler';
import {useEffect, useState} from 'react';
import * as S from 'screens/home/Home.style';
import {userStore} from 'store/Store';
import LinearGradient from 'react-native-linear-gradient';

export default function Home() {
  useBackHandler();
  const navigation1 = useNavigation<NavigationProp<RootTabParamList>>();
  const navigation2 = useNavigation<NavigationProp<RootHomeParamList>>();
  const navigation3 = useNavigation<NavigationProp<RootStackParamList>>();
  const {userInfo, isLoggedIn, setUserInfo} = userStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get('/user');

        if (response.data.success) {
          setUserInfo(response.data.data);
          console.log(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    console.log(isLoggedIn, userInfo?.user_name);
    getData();
    setIsLoading(false);
  }, [isLoggedIn]);

  const handleBtnReportNewBin = () => {
    if (isLoggedIn) {
      navigation3.navigate('ReportNewBinNavigator');
      return;
    }
    navigation2.navigate('LoginInProcess');
  };

  return (
    <LinearGradient
      colors={['#278FFF', '#E4E6EA']}
      start={{x: 0.5, y: 0}}
      end={{x: 0.5, y: 1}}
      locations={[0.1526, 0.2856]}
      style={{flex: 1, paddingTop: 14, paddingHorizontal: 16, paddingBottom: 18}}>
      <S.Inner bounces={false} showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <S.HeaderTitle>isLoading...</S.HeaderTitle>
        ) : userInfo?.user_name ? (
          <S.HeaderTitle>{`${userInfo?.user_name}, Start your BinVoyage!`}</S.HeaderTitle>
        ) : (
          <S.HeaderTitle>{`User, Start your BinVoyage!`}</S.HeaderTitle>
        )}
        <S.Bridge onPress={() => navigation1.navigate('FindBin')}>
          <S.BridgeImg source={require('assets/images/home-bridge.png')} />
        </S.Bridge>
        <S.Body>
          <S.BodyTitle>{`Collect Seoul\nstamps during BinVoyage`}</S.BodyTitle>
          <S.BodyDescription>Stamp varies by the bin location.</S.BodyDescription>
          {/* <S.PassPort onPress={() => navigation2.navigate('PassPort')}>
            <S.PassPortTitle>PASSPORT</S.PassPortTitle>
            <S.ImagePassPort source={require('assets/images/img-passport.png')} resizeMode="contain" />
            <S.PassPortSubTitle>{`TO THE BINVOYAGE\nIN SEOUL`}</S.PassPortSubTitle>
            <S.IconPassPort source={require('assets/images/icon-passport.png')} resizeMode="contain" />
          </S.PassPort> */}
          <S.PassPort onPress={() => navigation2.navigate('PassPort')} style={{alignSelf: 'center'}}>
            <S.PassPortImg source={require('assets/images/home-passport2.png')} resizeMode="contain" />
          </S.PassPort>
          <S.Button onPress={handleBtnReportNewBin}>
            <S.ButtonText>Find any new bin? Let us know!</S.ButtonText>
          </S.Button>
        </S.Body>
      </S.Inner>
    </LinearGradient>
  );
}

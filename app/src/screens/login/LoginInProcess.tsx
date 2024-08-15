import {GoogleSignin} from '@react-native-google-signin/google-signin';
import * as S from 'screens/login/Login.style';
import {useEffect} from 'react';
import {GOOGLE_WEB_CLIENT_ID} from '@env';
import GoogleSvg from 'assets/images/GoogleSvg';
import AppleSvg from 'assets/images/AppleSvg';
import {Palette} from 'constants/palette';
import {Alert, TouchableOpacity} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import api from 'api/api';
import appleAuth from '@invertase/react-native-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ArrowPrevSvg from 'assets/images/ArrowPrevSvg';

export default function LoginInProcess() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const myNavigation = useNavigation<NavigationProp<RootMyParamList>>();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT_ID,
      offlineAccess: false,
    });
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      if (userInfo.idToken) {
        const response = await api.post(`/login/oauth2?type=google&token=${userInfo.idToken}`);

        if (response.data.success) {
          await AsyncStorage.setItem('authToken', userInfo.idToken);
          navigation.navigate('UserInput');
        } else {
          Alert.alert('로그인 실패');
        }
      }
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const handleAppleLogin = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });
      // Alert.alert(`${appleAuthRequestResponse.identityToken}`);

      const {identityToken, authorizationCode} = appleAuthRequestResponse;
      if (identityToken) {
        const response = await api.post(`/login/oauth2?type=apple&token=${identityToken}&authorizationCode=${authorizationCode}`);

        if (response.data.success) {
          await AsyncStorage.setItem('authToken', identityToken);
          navigation.navigate('UserInput');
        } else {
          Alert.alert('로그인 실패');
        }
      }
    } catch (error) {
      Alert.alert(`${error}`);
    }
  };

  return (
    <>
      <S.Container>
        <S.ArrowPrevWrapper onPress={() => myNavigation.goBack()}>
          <ArrowPrevSvg width="24" height="24" fill={Palette.Gray4} />
        </S.ArrowPrevWrapper>
        <S.Wrapper>
          <S.LogoWrapper source={require('assets/images/logo.png')} />
          <S.Title>{'Login simply\nand continue!'}</S.Title>
          <S.SignInButtonWrapper>
            <S.AppleSignInButton onPress={handleAppleLogin}>
              <AppleSvg width="24" height="24" fill={Palette.White} />
              <S.AppleSignInText>Continue with Apple</S.AppleSignInText>
            </S.AppleSignInButton>
            <S.GoogleSignInButton onPress={handleGoogleLogin}>
              <GoogleSvg width="25" height="24" />
              <S.GoogleSignInText>Continue with Google</S.GoogleSignInText>
            </S.GoogleSignInButton>
          </S.SignInButtonWrapper>
        </S.Wrapper>
      </S.Container>
    </>
  );
}

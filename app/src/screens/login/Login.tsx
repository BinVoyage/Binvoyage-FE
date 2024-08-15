import {GoogleSignin} from '@react-native-google-signin/google-signin';
import * as S from 'screens/login/Login.style';
import {useEffect} from 'react';
import {GOOGLE_WEB_CLIENT_ID} from '@env';
import GoogleSvg from 'assets/images/GoogleSvg';
import AppleSvg from 'assets/images/AppleSvg';
import {Palette} from 'constants/palette';
import {Alert, TouchableOpacity} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Terms from 'components/terms/Terms';
import api from 'api/api';
import appleAuth from '@invertase/react-native-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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
        <S.Wrapper>
          <S.Title>{'No more wandering.\nStart your BinVoyage!'}</S.Title>
          <S.SignInButtonWrapper>
            <S.AppleSignInButton onPress={handleAppleLogin}>
              <AppleSvg width="24" height="24" fill={Palette.White} />
              <S.AppleSignInText>Continue with Apple</S.AppleSignInText>
            </S.AppleSignInButton>
            <S.GoogleSignInButton onPress={handleGoogleLogin}>
              <GoogleSvg width="25" height="24" />
              <S.GoogleSignInText>Continue with Google</S.GoogleSignInText>
            </S.GoogleSignInButton>
            <S.PassSignInButton onPress={() => navigation.navigate('BottomNavigator')}>
              <S.PassSignInText>Continue without logging in</S.PassSignInText>
            </S.PassSignInButton>
          </S.SignInButtonWrapper>
          <S.TextFooterWrapper>
            <S.TextFooter>By continuing, you agree to our </S.TextFooter>
            <TouchableOpacity>
              <S.TextFooterLink>Terms</S.TextFooterLink>
            </TouchableOpacity>
          </S.TextFooterWrapper>

          <S.TextFooterWrapper>
            <S.TextFooter>See how we use your data in our </S.TextFooter>
            <TouchableOpacity>
              <S.TextFooterLink>Privacy Policy</S.TextFooterLink>
            </TouchableOpacity>
          </S.TextFooterWrapper>
        </S.Wrapper>
      </S.Container>
      <Terms />
    </>
  );
}
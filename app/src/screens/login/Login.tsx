import {GoogleSignin, User} from '@react-native-google-signin/google-signin';
import * as S from 'screens/login/Login.style';
import {useEffect, useState} from 'react';
import {GOOGLE_WEB_CLIENT_ID} from '@env';
import GoogleSvg from 'assets/images/GoogleSvg';
import AppleSvg from 'assets/images/AppleSvg';
import {Palette} from 'constants/palette';
import {Alert, TouchableOpacity} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Terms from 'components/terms/Terms';
import api from 'api/api';
import appleAuth from '@invertase/react-native-apple-authentication';

export default function Login() {
  // const [userInfo, setUserInfo] = useState<User | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT_ID,
      offlineAccess: false,
    });
  });

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // Alert.alert(userInfo.idToken!);
      // setUserInfo(userInfo);
      const response = await api.post('/login/oauth2', {
        login_type: 'google',
        token: userInfo.idToken,
      });

      if (response.status === 200) {
        navigation.navigate('UserInput');
      } else {
        Alert.alert('로그인 실패');
      }
    } catch (error) {
      Alert.alert(`${error}`);
    }
  };

  const handleAppleLogin = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });
      // Alert.alert(`${appleAuthRequestResponse.identityToken}`);

      const {identityToken} = appleAuthRequestResponse;
      if (identityToken) {
        const response = await api.post('/login/oauth2', {
          login_type: 'apple',
          token: identityToken,
        });

        if (response.status === 200) {
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

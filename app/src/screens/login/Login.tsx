import {GoogleSignin} from '@react-native-google-signin/google-signin';
import * as S from 'screens/login/Login.style';
import {useEffect, useState} from 'react';
import {GOOGLE_WEB_CLIENT_ID} from '@env';
import GoogleSvg from 'assets/images/GoogleSvg';
import AppleSvg from 'assets/images/AppleSvg';
import {Palette} from 'constants/palette';
import {Alert, TouchableOpacity, Linking, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Terms from 'components/terms/Terms';
import api from 'api/api';
import appleAuth from '@invertase/react-native-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useBackHandler} from 'hooks/useBackHandler';
import { userStore } from 'store/Store';

export default function Login() {
  useBackHandler();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [showTerms, setShowTerms] = useState(false);
  const {setIsLoggedIn} = userStore();

  const checkTermsAgreement = async () => {
    try {
      const termsAgreement = await AsyncStorage.getItem('termsAgreement');
      if (termsAgreement !== 'true') {
        setShowTerms(true);
      }
    } catch (error) {
      console.log('Error checking terms agreement:', error);
    }
  };

  useEffect(() => {
    checkTermsAgreement();

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
          setIsLoggedIn(true);
          const hasAccount = response.data.data.user_name.length !== 0;
          await AsyncStorage.setItem('authToken', userInfo.idToken);

          if (hasAccount) {
            navigation.navigate('BottomNavigator');
          } else {
            navigation.navigate('UserInput');
          }
        } else {
          Alert.alert('로그인 실패');
        }
      }
    } catch (error: any) {
      console.log(error);
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
          setIsLoggedIn(true);
          const hasAccount = response.data.data.user_name.length !== 0;
          await AsyncStorage.setItem('authToken', identityToken);
          if (hasAccount) {
            navigation.navigate('BottomNavigator');
          } else {
            navigation.navigate('UserInput');
          }
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
          <View>
            <S.LogoWrapper source={require('assets/images/logo.png')} />
            <S.Title>{'No more wandering.\nStart your BinVoyage!'}</S.Title>
          </View>
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
          <View>
            <S.TextFooterWrapper>
              <S.TextFooter>By continuing, you agree to our </S.TextFooter>
              <TouchableOpacity
                onPress={() => Linking.openURL(`https://binvoyage.notion.site/Terms-of-service-49be66fa52b94ac9a5d937c0a2d341ba?pvs=4`)}>
                <S.TextFooterLink>Terms</S.TextFooterLink>
              </TouchableOpacity>
            </S.TextFooterWrapper>

            <S.TextFooterWrapper>
              <S.TextFooter>See how we use your data in our </S.TextFooter>
              <TouchableOpacity
                onPress={() => Linking.openURL(`https://binvoyage.notion.site/Privacy-policy-43cb8c8cfe3941fabc84097c693f8c6f?pvs=4`)}>
                <S.TextFooterLink>Privacy Policy</S.TextFooterLink>
              </TouchableOpacity>
            </S.TextFooterWrapper>
          </View>
        </S.Wrapper>
      </S.Container>
      {showTerms && <Terms />}
    </>
  );
}

import {ScrollView, Linking, Alert, View} from 'react-native';
import * as S from 'screens/myPage/MyPage.style';
import ArrowNextSvg from 'assets/images/ArrowNextSvg';
import {NavigationProp, useFocusEffect, useNavigation} from '@react-navigation/native';
import api from 'api/api';
import {useCallback, useEffect, useState} from 'react';
import {userStore} from 'store/Store';
import DeleteAccount from 'screens/deleteAccount/DeleteAccount';
import {useBackHandler} from 'hooks/useBackHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MyPage() {
  useBackHandler();
  const commentNavigator = useNavigation<NavigationProp<RootMyParamList>>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {userInfo, setUserInfo, isLoggedIn, setIsLoggedIn} = userStore();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  useEffect(() => {
    getMemberData();
  }, [isLoggedIn]);

  const getMemberData = async () => {
    try {
      const response = await api.get('/user');
      setUserInfo(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  function formatRegistrationDate(registrationDt: string): string {
    const dateObj = new Date(registrationDt);
    const options: Intl.DateTimeFormatOptions = {day: 'numeric', month: 'short', year: 'numeric'};
    const formattedDate = dateObj.toLocaleDateString('en-GB', options);

    return `Started BinVoyage ${formattedDate}`;
  }

  const handleFeedback = () => {
    if (userInfo) {
      commentNavigator.navigate('MyFeedback');
    } else {
      commentNavigator.navigate('LoginInProcess');
    }
  };

  const Logout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              console.log('로그아웃');
              await api.delete('/login/logout');
              setUserInfo(null);
              setIsLoggedIn(false);
              await AsyncStorage.removeItem('authToken');

              // 네비게이션 스택 초기화 및 로그인 화면으로 이동
              navigation.reset({
                index: 0,
                routes: [{name: 'Login'}],
              });
            } catch (error) {
              console.log(error);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };
  return (
    <>
      <S.MyWrapper>
        <ScrollView bounces={false}>
          <S.MyImage source={require('assets/images/ticket4x.png')}>
            <View>
              {userInfo ? (
                <>
                  <S.RowWrapper style={{marginLeft: 16}}>
                    <S.NickName>{userInfo.user_name}</S.NickName>
                    {/* <S.WriteImage source={require('assets/images/WriteProfile.png')} style={{alignItems: 'center'}} /> */}
                  </S.RowWrapper>
                  <S.Address>{formatRegistrationDate(userInfo.registration_dt)}</S.Address>
                </>
              ) : (
                <S.NickName style={{marginLeft: 13}}>Login is required.</S.NickName>
              )}
            </View>

            <S.SettingTopWrapper>
              {userInfo ? (
                <S.UserGrid>
                  <S.UserColumn>
                    <S.ColumnContent>{userInfo.newly_found_cnt}</S.ColumnContent>
                    <S.Sub>Newly found</S.Sub>
                  </S.UserColumn>

                  <S.UserColumn>
                    <S.ColumnContent>{userInfo.report_cnt}</S.ColumnContent>
                    <S.Sub>Reported</S.Sub>
                  </S.UserColumn>

                  <S.UserColumn style={{borderRightWidth: 0}}>
                    <S.ColumnContent>{userInfo.stamp_cnt}</S.ColumnContent>
                    <S.Sub>Verified</S.Sub>
                  </S.UserColumn>
                </S.UserGrid>
              ) : null}
            </S.SettingTopWrapper>
          </S.MyImage>
          <S.FeedbackButton onPress={handleFeedback}>
            <S.TextFeedbackButton>See my feedback</S.TextFeedbackButton>
            <S.ArrowNextWrapper>
              <ArrowNextSvg width="9" height="16" fill="#66B7FF" />
            </S.ArrowNextWrapper>
          </S.FeedbackButton>
          <S.SettingWrapper>
            <S.SettingButton
              style={{paddingTop: 0}}
              onPress={() => Linking.openURL(`https://binvoyage.notion.site/About-us-473ef656d31148ba87cf4d43ca2e2579?pvs=4`)}>
              <S.TextB1>About</S.TextB1>
              <S.ArrowNextWrapper>
                <ArrowNextSvg width="9" height="16" fill="#BEC1C7" />
              </S.ArrowNextWrapper>
            </S.SettingButton>
            <S.SettingButton onPress={() => Linking.openURL(`https://binvoyage.notion.site/Terms-of-service-49be66fa52b94ac9a5d937c0a2d341ba?pvs=4`)}>
              <S.TextB1>
                <S.OtherText>Terms of service</S.OtherText>
              </S.TextB1>
              <S.ArrowNextWrapper>
                <ArrowNextSvg width="9" height="16" fill="#BEC1C7" />
              </S.ArrowNextWrapper>
            </S.SettingButton>
            <S.SettingButton onPress={() => Linking.openURL(`https://binvoyage.notion.site/Privacy-policy-43cb8c8cfe3941fabc84097c693f8c6f?pvs=4`)}>
              <S.TextB1>
                <S.OtherText>Privacy policy</S.OtherText>
              </S.TextB1>
              <S.ArrowNextWrapper>
                <ArrowNextSvg width="9" height="16" fill="#BEC1C7" />
              </S.ArrowNextWrapper>
            </S.SettingButton>
            <S.SettingButton onPress={() => Linking.openURL(`https://forms.gle/qEAcgLHFw9x3GJ889`)}>
              <S.TextB1>
                <S.OtherText>Contact us</S.OtherText>
              </S.TextB1>
              <S.ArrowNextWrapper>
                <ArrowNextSvg width="9" height="16" fill="#BEC1C7" />
              </S.ArrowNextWrapper>
            </S.SettingButton>
            <S.SettingButton onPress={userInfo ? Logout : () => commentNavigator.navigate('LoginInProcess')}>
              <S.TextB1>
                <S.OtherText>{userInfo ? 'Log out' : 'Log in'}</S.OtherText>
              </S.TextB1>
              <S.ArrowNextWrapper>
                <ArrowNextSvg width="9" height="16" fill="#BEC1C7" />
              </S.ArrowNextWrapper>
            </S.SettingButton>
            {userInfo ? (
              <S.SettingButton onPress={() => setDeleteModal(true)}>
                <S.DeleteText>Delete account</S.DeleteText>
              </S.SettingButton>
            ) : null}
          </S.SettingWrapper>
        </ScrollView>
      </S.MyWrapper>
      {deleteModal ? <DeleteAccount setDeleteModal={setDeleteModal} /> : null}
    </>
  );
}

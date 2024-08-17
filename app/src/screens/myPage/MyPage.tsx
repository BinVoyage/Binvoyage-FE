import {ScrollView, Linking} from 'react-native';
import * as S from 'screens/myPage/MyPage.style';
import ArrowNextSvg from 'assets/images/ArrowNextSvg';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import api from 'api/api';
import {useEffect, useState} from 'react';
import {userStore} from 'store/Store';
import DeleteAccount from 'screens/DeleteAccount';
import {useBackHandler} from 'hooks/useBackHandler';

export default function MyPage() {
  useBackHandler();
  const commentNavigator = useNavigation<NavigationProp<RootMyParamList>>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {userInfo, setUserInfo} = userStore();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const getMemberData = async () => {
    try {
      const response = await api.get('/user');
      setUserInfo(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userInfo) {
      getMemberData();
    }
  }, []);

  const handleFeedback = () => {
    if (userInfo) {
      commentNavigator.navigate('MyComment');
    } else {
      commentNavigator.navigate('LoginInProcess');
    }
  };

  const Logout = async () => {
    try {
      await api.delete('/login/logout');
      setUserInfo(null);
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <S.MyWrapper>
        <ScrollView bounces={false}>
          <S.MyImage source={require('assets/images/Ticket.png')}>
            {userInfo ? (
              <S.RowWrapper style={{marginLeft: 13}}>
                <S.NickName>{userInfo.user_name}</S.NickName>
                <S.WriteImage source={require('assets/images/WriteProfile.png')} style={{alignItems: 'center'}} />
              </S.RowWrapper>
            ) : (
              <S.NickName style={{marginLeft: 13}}>로그인이 필요합니다.</S.NickName>
            )}
            {/* {userInfo && <S.Address>Started BinVoyage 2. Jul 2024</S.Address>} */}
            {userInfo && (
              <S.SettingTopWrapper>
                <S.UserGrid>
                  <S.Usercolumn>
                    <S.ColumnContent>{userInfo.newly_found_cnt}</S.ColumnContent>
                    <S.Sub>Newly found</S.Sub>
                  </S.Usercolumn>
                  <S.Sero />
                  <S.Usercolumn>
                    <S.ColumnContent>{userInfo.report_cnt}</S.ColumnContent>
                    <S.Sub>Reported</S.Sub>
                  </S.Usercolumn>
                  <S.Sero />
                  <S.Usercolumn>
                    <S.ColumnContent>{userInfo.stamp_cnt}</S.ColumnContent>
                    <S.Sub>Verified</S.Sub>
                  </S.Usercolumn>
                </S.UserGrid>
              </S.SettingTopWrapper>
            )}
          </S.MyImage>
          <S.FeedbackButton onPress={handleFeedback}>
            <S.TextFeedbackButton>See my feedback</S.TextFeedbackButton>
            <ArrowNextSvg width="24px" height="24px" fill="#66B7FF" />
          </S.FeedbackButton>
          {/* cmc 웹 노션 테스트로 연결해봤는데 실제기기에서 잘나옴 - 구글로 바꿔놓음 */}
          <S.SettingWrapper>
            <S.SettingButton
              style={{paddingTop: 0}}
              onPress={() => Linking.openURL(`https://binvoyage.notion.site/About-us-473ef656d31148ba87cf4d43ca2e2579?pvs=4`)}>
              <S.TextB1>About</S.TextB1>
              <ArrowNextSvg width="24px" height="24px" fill="#BEC1C7" />
            </S.SettingButton>
            <S.SettingButton onPress={() => Linking.openURL(`https://binvoyage.notion.site/Terms-of-service-49be66fa52b94ac9a5d937c0a2d341ba?pvs=4`)}>
              <S.TextB1>
                <S.OtherText>Terms of service</S.OtherText>
              </S.TextB1>
              <ArrowNextSvg width="24px" height="24px" fill="#BEC1C7" />
            </S.SettingButton>
            <S.SettingButton onPress={() => Linking.openURL(`https://binvoyage.notion.site/Privacy-policy-43cb8c8cfe3941fabc84097c693f8c6f?pvs=4`)}>
              <S.TextB1>
                <S.OtherText>Privacy policy</S.OtherText>
              </S.TextB1>
              <ArrowNextSvg width="24px" height="24px" fill="#BEC1C7" />
            </S.SettingButton>
            <S.SettingButton onPress={() => Linking.openURL(`https://forms.gle/qEAcgLHFw9x3GJ889`)}>
              <S.TextB1>
                <S.OtherText>Contact us</S.OtherText>
              </S.TextB1>
              <ArrowNextSvg width="24px" height="24px" fill="#BEC1C7" />
            </S.SettingButton>
            <S.SettingButton onPress={userInfo ? Logout : () => commentNavigator.navigate('LoginInProcess')}>
              <S.TextB1>
                <S.OtherText>{userInfo ? 'Log out' : 'Log in'}</S.OtherText>
              </S.TextB1>
              <ArrowNextSvg width="24px" height="24px" fill="#BEC1C7" />
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

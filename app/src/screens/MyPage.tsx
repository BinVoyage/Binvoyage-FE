import {Text, View, ScrollView, Linking} from 'react-native';
import styled from 'styled-components/native';
import {Palette} from 'constants/palette';
import ArrowNextSvg from 'assets/images/ArrowNextSvg';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Typo} from 'constants/typo';

export default function MyPage() {
  const CommentNavigator = useNavigation<NavigationProp<RootMyParamList>>();

  return (
    <MyWrapper>
      <ScrollView>
        <MyImage source={require('assets/images/Ticket.png')} style={{alignItems: 'center'}}>
          <SettingTopWrapper>
            <TopWrapper>
              <NickName>Nickname</NickName>
              <WriteImage source={require('assets/images/WriteProfile.png')} style={{alignItems: 'center'}} />
            </TopWrapper>
            <MiddleWrapper>
              <Address>Started BinVoyage 2. Jul 2024</Address>
            </MiddleWrapper>
          </SettingTopWrapper>
          <UserGrid>
            <Usercolumn>
              <ColumnContent>20</ColumnContent>
              <Sub>Newly found</Sub>
            </Usercolumn>
            <Sero />
            <Usercolumn>
              <ColumnContent>11</ColumnContent>
              <Sub>Reported</Sub>
            </Usercolumn>
            <Sero />
            <Usercolumn>
              <ColumnContent>20</ColumnContent>
              <Sub>Verified</Sub>
            </Usercolumn>
          </UserGrid>
        </MyImage>
        <FeedbackButton onPress={() => CommentNavigator.navigate('MyComment')}>
          <TextWrapper>
            <Texts>
              <Text>See my feedback</Text>
            </Texts>
            <ArrowNextSvg width="24px" height="24px" fill="#66B7FF" />
          </TextWrapper>
        </FeedbackButton>
        <SettingWrapper>
          {/* cmc 웹 노션 테스트로 연결해봤는데 실제기기에서 잘나옴 - 구글로 바꿔놓음 */}
          <SettingButton onPress={() => Linking.openURL(`https://google.com`)}>
            <TextWrapper>
              <SettingTexts>
                <OtherText>About</OtherText>
              </SettingTexts>
              <ArrowNextSvg width="24px" height="24px" fill="#BEC1C7" />
            </TextWrapper>
          </SettingButton>
          <SettingButton>
            <TextWrapper>
              <SettingTexts2>
                <OtherText>Terms of service</OtherText>
              </SettingTexts2>
              <ArrowNextSvg width="24px" height="24px" fill="#BEC1C7" />
            </TextWrapper>
          </SettingButton>
          <SettingButton>
            <TextWrapper>
              <SettingTexts3>
                <OtherText>Privacy policy</OtherText>
              </SettingTexts3>
              <ArrowNextSvg width="24px" height="24px" fill="#BEC1C7" />
            </TextWrapper>
          </SettingButton>
          <SettingButton>
            <TextWrapper>
              <SettingTexts4>
                <OtherText>Contact us</OtherText>
              </SettingTexts4>
              <ArrowNextSvg width="24px" height="24px" fill="#BEC1C7" />
            </TextWrapper>
          </SettingButton>
          <SettingButton>
            <TextWrapper>
              <SettingTexts5>
                <OtherText>Log out</OtherText>
              </SettingTexts5>
              <ArrowNextSvg width="24px" height="24px" fill="#BEC1C7" />
            </TextWrapper>
          </SettingButton>
          <SettingButton onPress={() => CommentNavigator.navigate('DeleteAccount')}>
            <TextWrapper>
              <DeleteText>Delete account</DeleteText>
            </TextWrapper>
          </SettingButton>
        </SettingWrapper>
      </ScrollView>
    </MyWrapper>
  );
}

const MyWrapper = styled.View`
  width: 100%;
  height: 1200px;
  align-items: center;
  background: ${Palette.Gray1};
  display: flex;
`;

const MyImage = styled.ImageBackground`
  align-content: center;
  margin-top: 22px;
  margin-left: 16px;
  margin-right: 16px;
  margin-bottom: 22px;
  width: 343px;
  height: 149px;
`;

const SettingWrapper = styled.View`
  flex: 1;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  width: 343px;
  height: 332px;
  border-radius: 12px;
  background-color: ${Palette.White};
  margin-left: 16px;
`;

const TextWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;

const Texts = styled.View`
  padding-right: 175px;
`;

const FeedbackButton = styled.TouchableOpacity`
  width: 342px;
  height: 48px;
  padding: 12px 12px 12px 16px;
  gap: 10px;
  border-radius: 12px;
  border: 1px solid ${Palette.P100};
  background: ${Palette.P100};
  margin-bottom: 12px;
  margin-left: 16px;
`;

const TopWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: left;
`;

const MiddleWrapper = styled.View`
  width: 191px;
  height: 22px;
`;

const SettingTopWrapper = styled.View`
  width: 191px;
  height: 70px;
  padding-top: 17px;
  margin-right: 100px;
  align-items: left;
`;
const WriteImage = styled.Image`
  align-content: left;
  padding-right: 8px;
`;

const NickName = styled.Text`
  font-size: ${Typo.B3.fontSize};
  font-weight: ${Typo.B3.fontWeight};
  color: ${Palette.Gray1};
  padding-right: 4px;
`;

const Address = styled.Text`
  font-size: ${Typo.B3.fontSize};
  font-weight: ${Typo.B3.fontWeight};
  color: ${Palette.Gray1};
`;

const UserGrid = styled.View`
  flex-direction: row;
  width: 275px;
`;

const Usercolumn = styled.View`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  margin-left: 8px;
  margin-right: 8px;
  width: 71px;
  height: 35px;
`;
const Sub = styled.Text`
  font-size: ${Typo.Label.fontSize};
  font-weight: ${Typo.Label.fontWeight};
  color: ${Palette.Gray1};
`;

const ColumnContent = styled.Text`
  font-size: ${Typo.B3.fontSize};
  font-weight: ${Typo.B3.fontWeight};
  color: ${Palette.Gray1};
`;

const Sero = styled.View`
  width: 1px;
  height: 34px;
  background: #ade0ff;
  margin-top: 10px;
`;

const SettingButton = styled.TouchableOpacity`
  width: 332px;
  height: 40px;
  padding: 12px 12px 3px 16px;
  gap: 10px;
  border-radius: 12px;
  border: 1px solid ${Palette.White};
  background: ${Palette.White};
  margin-bottom: 3px;
  margin-left: 16px;
`;

const SettingTexts = styled.View`
  padding-right: 235px;
`;

const SettingTexts2 = styled.View`
  padding-right: 155px;
`;

const SettingTexts3 = styled.View`
  padding-right: 175px;
`;
const SettingTexts4 = styled.View`
  padding-right: 195px;
`;
const SettingTexts5 = styled.View`
  padding-right: 220px;
`;

const DeleteText = styled.Text`
  font-size: ${Typo.B1.fontSize};
  font-weight: ${Typo.B1.fontWeight};
  color: ${Palette.Gray4};
`;

const OtherText = styled.Text`
  font-size: ${Typo.B1.fontSize};
  font-weight: ${Typo.B1.fontWeight};
  color: ${Palette.Gray6};
  line-height: 22.4px; /* 22.4px */
`;

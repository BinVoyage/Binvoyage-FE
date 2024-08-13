import {Palette} from 'constants/palette';
import {Image, Text, View} from 'react-native';
import styled from 'styled-components/native';
import NewTrashLocation from 'assets/images/NewTrashLocation';
import DefaultText from 'components/DefaultText';
import {Typo} from 'constants/typo';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import api from 'api/api';

export default function DeleteAccount() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const CommentNavigator = useNavigation<NavigationProp<RootMyParamList>>();
  const DeleteAccount = async () => {
    try {
      await api.delete('/user');
      console.log('성공');
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Background>
      <Wrapper>
        <Header>
          <HeadText>Hey, wait!</HeadText>
          <HeadText> Where are you going?</HeadText>
        </Header>
        <Body>
          <ContentText>
            <FirstText>
              By proceeding, you will delete your BinVoyage account and erase all your personal data stored by BinVoyage. You will lose your stamps
              and achievements. This action can’t be undone.
            </FirstText>
            <SecondText>Are you sure you want to delete your account?</SecondText>
          </ContentText>
          <ButtonWrapper>
            <ActiveButton onPress={() => CommentNavigator.navigate('MyPage')}>
              <ButtonText>Keep my account</ButtonText>
            </ActiveButton>
            <DeleteButton onPress={DeleteAccount}>
              <DeleteButtonText>Delete my account</DeleteButtonText>
            </DeleteButton>
          </ButtonWrapper>
        </Body>
      </Wrapper>
    </Background>
  );
}

const Background = styled.View`
  position: absolute;
  flex: 1;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
  bottom: 0;
`;

const Wrapper = styled.View`
  width: 100%;
  height: 428px;
  border-radius: 20px 20px 0px 0px;
  background: ${Palette.White};
  gap: 6px;
  margin-top: auto;
`;

const Header = styled.View`
  padding-left: 18px;
  padding-bottom: 8px;
  padding-top: 34px;
  align-items: left;
  border-radius: 20px 20px 0px 0px;
  background: ${Palette.White};
`;

const HeadText = styled.Text`
  width: 183px;
  height: 25px;
  font-weight: ${Typo.Title2.fontWeight};
  font-size: ${Typo.Title2.fontSize};
  color: ${Palette.Black};
`;

const ContentText = styled.View`
  width: 336px;
  height: 166px;
`;

const FirstText = styled.Text`
  padding-bottom: 20px;
  font-weight: ${Typo.B3.fontWeight};
  font-size: ${Typo.B3.fontSize};
  color: ${Palette.Black};
`;

const SecondText = styled.Text`
  width: 230px;
  padding-bottom: 8px;
  font-weight: ${Typo.B3.fontWeight};
  font-size: ${Typo.B3.fontSize};
  color: ${Palette.Black};
`;
const Body = styled.View`
  padding-left: 18px;
  padding-bottom: 8px;
  padding-top: 8px;
  flex: 1;
  background: ${Palette.White};
`;

const ButtonWrapper = styled.View`
  flex: 1;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
`;

const ActiveButton = styled.TouchableOpacity`
  width: 343px;
  height: 48px;
  padding: 13px 30px;
  border-radius: 10px;
  background: ${Palette.Primary};
  margin-top: 10px;
  margin-bottom: 12px;
`;
const DeleteButton = styled.TouchableOpacity`
  width: 343px;
  height: 48px;
  padding: 14px 30px;
  border-radius: 10px;
  background: ${Palette.Gray3};
  margin-top: 5px;
  margin-bottom: 18px;
`;

export const ButtonText = styled.Text`
  font-size: ${Typo.Button1.fontSize};
  font-weight: ${Typo.Button1.fontWeight};
  color: ${Palette.White};
  text-align: center;
`;

export const DeleteButtonText = styled.Text`
  font-size: ${Typo.Button1.fontSize};
  font-weight: ${Typo.Button1.fontWeight};
  color: ${Palette.Gray5};
  text-align: center;
`;

import {Palette} from 'constants/palette';
import styled from 'styled-components/native';
import {Typo} from 'constants/typo';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import api from 'api/api';

interface Props {
  setDeleteModal: (value: boolean) => void;
}

export default function DeleteAccount({setDeleteModal}: Props) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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
          <HeadText>Where are you going?</HeadText>
        </Header>
        <Body>
          <FirstText>
            By proceeding, you will delete your BinVoyage account and erase all your personal data stored by BinVoyage. You will lose your stamps and
            achievements. This action can’t be undone.
          </FirstText>
          <SecondText>{`Are you sure you want to\ndelete your account?`}</SecondText>
          <ButtonWrapper>
            <ActiveButton onPress={() => setDeleteModal(false)}>
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
  padding: 34px 18px 38px;
  border-radius: 20px 20px 0px 0px;
  background: ${Palette.White};
  gap: 6px;
  margin-top: auto;
`;

const Header = styled.View`
  align-items: left;
  background: ${Palette.White};
`;

const HeadText = styled.Text`
  font-weight: ${Typo.Title2.fontWeight};
  font-size: ${Typo.Title2.fontSize};
  color: ${Palette.Black};
`;

const FirstText = styled.Text`
  margin-bottom: 20px;
  font-weight: ${Typo.B3.fontWeight};
  font-size: ${Typo.B3.fontSize};
  color: ${Palette.Black};
`;

const SecondText = styled.Text`
  margin-bottom: 30px;
  font-weight: ${Typo.B3.fontWeight};
  font-size: ${Typo.B3.fontSize};
  color: ${Palette.Black};
`;
const Body = styled.View`
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
  width: 100%;
  padding: 13px 30px;
  border-radius: 10px;
  background: ${Palette.Primary};
  margin-top: 10px;
  margin-bottom: 12px;
`;
const DeleteButton = styled.TouchableOpacity`
  width: 100%;
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

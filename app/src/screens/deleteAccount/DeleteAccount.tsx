import {NavigationProp, useNavigation} from '@react-navigation/native';
import api from 'api/api';
import * as S from 'screens/deleteAccount/DeleteAccount.style';

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
    <S.Background>
      <S.Wrapper>
        <S.Header>
          <S.HeadText>Hey, wait!</S.HeadText>
          <S.HeadText>Where are you going?</S.HeadText>
        </S.Header>
        <S.Body>
          <S.FirstText>
            By proceeding, you will delete your BinVoyage account and erase all your personal data stored by BinVoyage. You will lose your stamps and
            achievements. This action can’t be undone.
          </S.FirstText>
          <S.SecondText>{`Are you sure you want to\ndelete your account?`}</S.SecondText>
          <S.ButtonWrapper>
            <S.ActiveButton onPress={() => setDeleteModal(false)}>
              <S.ButtonText>Keep my account</S.ButtonText>
            </S.ActiveButton>
            <S.DeleteButton onPress={DeleteAccount}>
              <S.DeleteButtonText>Delete my account</S.DeleteButtonText>
            </S.DeleteButton>
          </S.ButtonWrapper>
        </S.Body>
      </S.Wrapper>
    </S.Background>
  );
}

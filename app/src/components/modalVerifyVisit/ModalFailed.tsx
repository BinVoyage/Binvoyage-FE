import {NavigationProp, useNavigation} from '@react-navigation/native';
import * as S from 'components/modalVerifyVisit/ModalVerifyVisit.style';
import {Image} from 'react-native';

interface Props {
  handleReportIssue: () => void;
}

export default function ModalFailed({handleReportIssue}: Props) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <S.Background>
      <S.Container>
        <S.Title>Couldn’t find the bin?</S.Title>
        <Image source={require('assets/images/img-verify-failed.png')} style={{width: 143, height: 152, marginTop: 10}} />
        <S.TextB1>Report the issue and we’ll update.</S.TextB1>
        <S.Button isPrimary style={{marginBottom: 10}} onPress={handleReportIssue}>
          <S.ButtonText isPrimary>Report issue</S.ButtonText>
        </S.Button>
        <S.Button onPress={() => navigation.navigate('BottomNavigator')}>
          <S.ButtonText>Maybe next time</S.ButtonText>
        </S.Button>
      </S.Container>
    </S.Background>
  );
}

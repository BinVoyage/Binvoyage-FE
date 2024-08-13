import {NavigationProp, useNavigation} from '@react-navigation/native';
import * as S from 'components/modalVerifyVisit/ModalVerifyVisit.style';
import {Image} from 'react-native';

export default function ModalStamp() {
  const navigation = useNavigation<NavigationProp<RootHomeParamList>>();
  return (
    <S.Background>
      <S.Container>
        <S.Title>Thanks for your BinVoyage!</S.Title>
        <S.TextAddress>New stamp added!</S.TextAddress>
        <Image source={require('assets/images/img-verify-stamp.png')} style={{width: 181, height: 176}} />
        <S.TextB1>Check your passport in HOME</S.TextB1>
        <S.Button isPrimary onPress={() => navigation.navigate('Home')}>
          <S.ButtonText isPrimary>Okay!</S.ButtonText>
        </S.Button>
      </S.Container>
    </S.Background>
  );
}

import {NavigationProp, RouteProp, useNavigation} from '@react-navigation/native';
import ArrowPrevSvg from 'assets/images/ArrowPrevSvg';
import BinSvg from 'assets/images/BinSvg';
import ModalSuccess from 'components/modalVerifyVisit/ModalSuccess';
import {Palette} from 'constants/palette';
import {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import * as S from 'screens/verifyVisit/VerifyVisit.style';

type VerifyVisitProps = {
  route: RouteProp<RootBinDetailParamList, 'VerifyVisit'>;
};

export default function VerifyVisit({route}: VerifyVisitProps) {
  const {bin_id, type_name, location_type_name, address, detail, image} = route.params;
  const navigation = useNavigation<NavigationProp<RootBinDetailParamList>>();
  const [isValid, setIsValid] = useState<boolean>(true);
  const [titleMessage, setTitleMessage] = useState<string>(`Get closer to the bin to verify\nyour visit!`);
  const [modalSuccess, setModalSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (isValid) {
      setTitleMessage(`You’ve arrived! Did you\nsuccessfully find the bin?`);
      return;
    }
    setTitleMessage(`Get closer to the bin to verify\nyour visit!`);
  }, [isValid]);
  return (
    <>
      <S.Container>
        <S.ArrowPrevWrapper onPress={() => navigation.goBack()}>
          <ArrowPrevSvg width="24" height="24" fill={Palette.Gray4} />
        </S.ArrowPrevWrapper>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false} style={{marginBottom: 28}}>
          <S.RowWrapper style={{gap: 2}}>
            <BinSvg width="18" height="18" fill={type_name === 'Trash' ? Palette.Secondary2 : Palette.Primary} />
            <S.TextInfoB1>{type_name}</S.TextInfoB1>
          </S.RowWrapper>
          <S.Title>{titleMessage}</S.Title>
          <S.AddressWrapper>
            <S.TextInfoB3>{address}</S.TextInfoB3>
          </S.AddressWrapper>
          <S.ImageArea />
          <S.DetailWrapper style={{marginBottom: 16}}>
            <S.RowWrapper style={{justifyContent: 'flex-start'}}>
              <S.TextLocation>Location details</S.TextLocation>
              <S.LabelLocation>
                <S.LabelLocationText>{location_type_name}</S.LabelLocationText>
              </S.LabelLocation>
            </S.RowWrapper>
            <S.TextLocationContents>{detail}</S.TextLocationContents>
          </S.DetailWrapper>
        </ScrollView>
        <S.BtnContainer>
          <S.Button isPrimary isValid={isValid} disabled={!isValid} onPress={() => setModalSuccess(true)}>
            <S.ButtonText isValid={isValid}>Found it!</S.ButtonText>
          </S.Button>
          <S.Button isValid={isValid} disabled={!isValid}>
            <S.ButtonText isValid={isValid}>Can't find it</S.ButtonText>
          </S.Button>
        </S.BtnContainer>
      </S.Container>
      {modalSuccess ? <ModalSuccess bin_id={bin_id} address={address} /> : null}
    </>
  );
}

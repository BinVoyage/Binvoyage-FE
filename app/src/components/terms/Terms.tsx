import {useEffect, useState} from 'react';
import {Linking, TouchableOpacity} from 'react-native';
import * as S from 'components/terms/Terms.style';
import CheckBoxSvg from 'assets/images/CheckBoxSvg';
import {Palette} from 'constants/palette';
import CheckBoxFilledSvg from 'assets/images/CheckBoxFilledSvg';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Terms() {
  const [agree, setAgree] = useState<boolean>(false);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [receivePromotion, setReceivePromotion] = useState<boolean>(false);

  const handleSubmit = async () => {
    await AsyncStorage.setItem('termsAgreement', 'true');
    setAgree(true);
  };

  useEffect(() => {
    if (selectAll) {
      setIsValid(true);
      setReceivePromotion(true);
      return;
    }
    setIsValid(false);
    setReceivePromotion(false);
  }, [selectAll]);

  return agree ? null : (
    <S.Background>
      <S.Wrapper>
        <S.Header>
          {/* <S.Indicator /> */}
          <S.Title>Terms and Conditions</S.Title>
          <S.Description>Read the following terms carefully.</S.Description>
          <S.Description>By checking the boxes, you agree to our terms.</S.Description>
        </S.Header>
        <S.Body>
          <S.AcceptAllWrapper>
            <TouchableOpacity onPress={() => setSelectAll(prev => !prev)}>
              {selectAll ? <CheckBoxFilledSvg width="24" height="24" fill={Palette.Primary} /> : <CheckBoxSvg width="24" height="24" />}
            </TouchableOpacity>
            <S.TextAcceptAll>Accept all</S.TextAcceptAll>
          </S.AcceptAllWrapper>
          <S.AgreementWrapper>
            <TouchableOpacity onPress={() => setIsValid(prev => !prev)}>
              {isValid ? <CheckBoxFilledSvg width="24" height="24" fill={Palette.Primary} /> : <CheckBoxSvg width="24" height="24" />}
            </TouchableOpacity>
            <S.TextWrapper>
              <S.TextAgreement>️I accept the </S.TextAgreement>
              <TouchableOpacity
                onPress={() => Linking.openURL('https://binvoyage.notion.site/Terms-of-service-49be66fa52b94ac9a5d937c0a2d341ba?pvs=4')}>
                <S.TextAgreementLink>Terms of Service</S.TextAgreementLink>
              </TouchableOpacity>
              <S.TextAgreement> and </S.TextAgreement>
              <TouchableOpacity
                onPress={() => Linking.openURL('https://binvoyage.notion.site/Privacy-policy-43cb8c8cfe3941fabc84097c693f8c6f?pvs=4')}>
                <S.TextAgreementLink>Privacy Policy</S.TextAgreementLink>
              </TouchableOpacity>
              <S.TextAgreement> of BinVoyage.</S.TextAgreement>
              <S.TextRequired>(Required)</S.TextRequired>
            </S.TextWrapper>
          </S.AgreementWrapper>
          <S.AgreementWrapper>
            <TouchableOpacity onPress={() => setReceivePromotion(prev => !prev)}>
              {receivePromotion ? <CheckBoxFilledSvg width="24" height="24" fill={Palette.Primary} /> : <CheckBoxSvg width="24" height="24" />}
            </TouchableOpacity>
            <S.TextWrapper>
              <S.TextAgreement>️I’d like to receive promotional updates from BinVoyage. (Optional)</S.TextAgreement>
            </S.TextWrapper>
          </S.AgreementWrapper>
          <S.Button onPress={handleSubmit} isValid={isValid} disabled={!isValid}>
            <S.ButtonText isValid={isValid}>I agree</S.ButtonText>
          </S.Button>
        </S.Body>
      </S.Wrapper>
    </S.Background>
  );
}

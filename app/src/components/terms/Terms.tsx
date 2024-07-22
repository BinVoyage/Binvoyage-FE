import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {useMemo, useRef, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import * as S from 'components/terms/Terms.style';

export default function Terms() {
  const [agree, setAgree] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [receivePromotion, setReceivePromotion] = useState<boolean>(false);

  const handleSubmit = () => {
    setAgree(true);
  };

  return agree ? null : (
    <S.Background>
      <S.Wrapper>
        <S.Header>
          <S.Indicator />
          <S.Title>Terms and Conditions</S.Title>
          <S.Description>Read the following terms carefully.</S.Description>
          <S.Description>By checking the boxes, you agree to our terms.</S.Description>
        </S.Header>
        <S.Body>
          <S.AgreementWrapper>
            <S.CheckBox onPress={() => setIsValid(prev => !prev)} />
            <S.TextWrapper>
              <S.TextAgreement>️I accept the </S.TextAgreement>
              <TouchableOpacity>
                <S.TextAgreementLink>Terms of Service</S.TextAgreementLink>
              </TouchableOpacity>
              <S.TextAgreement> and </S.TextAgreement>
              <TouchableOpacity>
                <S.TextAgreementLink>Privacy Policy</S.TextAgreementLink>
              </TouchableOpacity>
              <S.TextAgreement> of BinVoyage.</S.TextAgreement>
              <S.TextRequired>(Required)</S.TextRequired>
            </S.TextWrapper>
          </S.AgreementWrapper>
          <S.AgreementWrapper>
            <S.CheckBox onPress={() => setReceivePromotion(prev => !prev)} />
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

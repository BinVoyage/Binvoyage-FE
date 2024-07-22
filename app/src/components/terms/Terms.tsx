import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {useMemo, useRef, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import * as S from 'components/terms/Terms.style';

export default function Terms() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [183, 183], []);
  const [isValid, setIsValid] = useState<boolean>(false);

  return (
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
            <S.TextAgreement>️I accept the
              <TouchableOpacity><S.TextAgreementLink>Terms of Service</S.TextAgreementLink></TouchableOpacity>
              and
              <TouchableOpacity><S.TextAgreementLink>Privacy Policy</S.TextAgreementLink></TouchableOpacity> of BinVoyage.
            </S.TextAgreement>
          </S.AgreementWrapper>
          <S.AgreementWrapper>
            <S.TextAgreement>️I’d like to receive promotional updates from BinVoyage. (Optional)</S.TextAgreement>
          </S.AgreementWrapper>
          <S.Button isValid={isValid}>
            <S.ButtonText isValid={isValid}>I agree</S.ButtonText>
          </S.Button>
        </S.Body>
      </S.Wrapper>
    </S.Background>
  );
}

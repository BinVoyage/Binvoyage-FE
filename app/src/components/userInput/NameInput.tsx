import * as S from 'components/userInput/UserInput.style';
import {Palette} from 'constants/palette';
import {useState} from 'react';

interface Props {
  onNext: () => void;
}

export default function NameInput({onNext}: Props) {
  const [isValid, setIsValid] = useState<boolean>(false);

  return (
    <S.Container>
      <S.Step>
        <S.StepText>1/2</S.StepText>
      </S.Step>
      <S.Title>What should we call you?</S.Title>
      <S.Label isRequired={true}>*Required</S.Label>
      <S.TextInput placeholder="Please write your nickname here" placeholderTextColor={Palette.Gray4} />
      <S.Button isValid={isValid} onPress={onNext}>
        <S.ButtonText isValid={isValid}>Next</S.ButtonText>
      </S.Button>
    </S.Container>
  );
}

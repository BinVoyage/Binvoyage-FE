import * as S from 'components/userInput/UserInput.style';
import {useState} from 'react';

export default function CountryInput() {
  const [isValid, setIsValid] = useState<boolean>(false);

  return (
    <S.Container>
      <S.Step>
        <S.StepText>2/2</S.StepText>
      </S.Step>
      <S.Title>{`Which country\ndo you call home?`}</S.Title>
      <S.Label isRequired={false}>*Optional</S.Label>
      <S.Button isValid={isValid}>
        <S.ButtonText isValid={isValid}>Next</S.ButtonText>
      </S.Button>
    </S.Container>
  );
}

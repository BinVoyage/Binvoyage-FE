import * as S from 'components/onBoarding/OnBoarding.style';

interface Props {
  onStart: () => void;
}

export default function Onboarding3({onStart}: Props) {
  return (
    <S.Container>
      <S.Background></S.Background>
      <S.Modal>
        <S.Pagination>
          <S.Dot />
          <S.Dot />
          <S.CurrentDot />
        </S.Pagination>
        <S.Text>Report and let us fix!</S.Text>
        <S.Button type="start" onPress={onStart}>
          <S.ButtonText type="start">Start</S.ButtonText>
        </S.Button>
      </S.Modal>
    </S.Container>
  );
}

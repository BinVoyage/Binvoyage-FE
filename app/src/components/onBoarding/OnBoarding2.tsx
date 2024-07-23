import * as S from 'components/onBoarding/OnBoarding.style';

interface Props {
  onNext: () => void;
}

export default function Onboarding2({onNext}: Props) {
  return (
    <S.Container>
      <S.Background></S.Background>
      <S.Modal>
        <S.Pagination>
          <S.Dot />
          <S.CurrentDot />
          <S.Dot />
        </S.Pagination>
        <S.Text>{`Visit bins,\nget special stamps`}</S.Text>
        <S.Button type="next" onPress={onNext}>
          <S.ButtonText type="next">Next</S.ButtonText>
        </S.Button>
      </S.Modal>
    </S.Container>
  );
}

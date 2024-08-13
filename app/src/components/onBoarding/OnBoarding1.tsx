import * as S from 'components/onBoarding/OnBoarding.style';
import { ImageBackground } from 'react-native';

interface Props {
  onNext: () => void;
}

export default function Onboarding1({onNext}: Props) {
  return (
    <S.Container>
      <S.Background>
        <S.BgImg source={require('assets/images/img-onboarding1.png')} />
      </S.Background>
      <S.Modal>
        <S.Pagination>
          <S.CurrentDot />
          <S.Dot />
          <S.Dot />
        </S.Pagination>
        <S.Text>{`Find the nearest bin\nwith BinVoyage`}</S.Text>
        <S.Button type="next" onPress={onNext}>
          <S.ButtonText type="next">Next</S.ButtonText>
        </S.Button>
      </S.Modal>
    </S.Container>
  );
}

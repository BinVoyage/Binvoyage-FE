import ArrowNextSvg from 'assets/images/ArrowNextSvg';
import HomeTrashSvg from 'assets/images/HomeTrashSvg';
import { Palette } from 'constants/palette';
import * as S from 'screens/home/Home.style';

export default function Home() {
  return (
    <S.Container>
      <S.HeaderTitle>Julia, Start your BinVoyage!</S.HeaderTitle>
      <S.Bridge>
        <S.BridgeIconWrapper source={require('assets/images/icon-trash-wrapper.png')} resizeMode='cover'>
          <HomeTrashSvg width="40" height="66" />
        </S.BridgeIconWrapper>
        <S.BridgeTextWrapper source={require('assets/images/icon-text-wrapper.png')} resizeMode='stretch'>
          <S.BridgeText>{`Struggling to find bins? 😓\nThere’s one just 350m away!`}</S.BridgeText>
        </S.BridgeTextWrapper>
      </S.Bridge>
      <S.Body>
        <S.BodyTitle>{`Collect Seoul\nstamps during BinVoyage`}</S.BodyTitle>
        <S.BodyDescription>Stamp varies by the bin location.</S.BodyDescription>
        <S.PassPortBg>
        <S.ArrowNextWrapper>
            <ArrowNextSvg width='9' height='16' fill={Palette.Gray4}/>
          </S.ArrowNextWrapper>
          <S.PassPort></S.PassPort>
        </S.PassPortBg>
        <S.Button>
          <S.ButtonText>Find any new bin? Let us know!</S.ButtonText>
        </S.Button>
      </S.Body>
    </S.Container>
  );
}

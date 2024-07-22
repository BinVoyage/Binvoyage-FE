import HomeTrashSvg from 'assets/images/HomeTrashSvg';
import {Text, View} from 'react-native';
import * as S from 'screens/home/Home.style';

export default function Home() {
  return (
    <S.Container>
      <S.HeaderTitle>Julia, Start your BinVoyage!</S.HeaderTitle>
      <S.Bridge>
        <S.BridgeIconWrapper source={require('assets/images/HomeIconWrapperSvg')}>
          <HomeTrashSvg width="40" height="66" />
        </S.BridgeIconWrapper>
        <S.BridgeTextWrapper>
          <S.BridgeText>Struggling to find bins? 😓 There’s one just 350m away!</S.BridgeText>
        </S.BridgeTextWrapper>
      </S.Bridge>
    </S.Container>
  );
}

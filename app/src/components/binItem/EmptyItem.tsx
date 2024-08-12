import * as S from 'components/binItem/EmptyItem.style';

export default function EmptyItem() {
  return (
    <S.Container>
      <S.ImageWrapper source={require('assets/images/img-empty-face.png')} resizeMode="contain" />
      <S.TextEmpty>{`No results here.\nTry moving the map a bit!`}</S.TextEmpty>
    </S.Container>
  );
}

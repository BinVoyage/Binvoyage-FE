import * as S from 'components/binItem/BinItem.style';

export default function BinItem({item}: {item: BinItemProps}) {
  return (
    <S.Container>
      <S.TextAddress numberOfLines={2} ellipsizeMode="tail">
        {item.address}
      </S.TextAddress>
      <S.TextType>{item.type_name}</S.TextType>
      <S.TextDistance>{`${item.distance}m away`}</S.TextDistance>
      <S.VisitWrapper>
        <S.TextVisit>Most users found this bin!</S.TextVisit>
      </S.VisitWrapper>
    </S.Container>
  );
}

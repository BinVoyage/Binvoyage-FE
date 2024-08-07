import * as S from 'components/binItem/BinItem.style';

export default function BinItem({item}: {item: BinItemProps}) {
  let visitMessage = '';
  if (item.visit_success_rate !== null && item.visit_success_rate !== undefined && item.visit_count) {
    if (item.visit_success_rate >= 70) {
      visitMessage = 'Most users found this bin!';
    } else if (item.visit_success_rate >= 40) {
      visitMessage = 'Some users found this bin!';
    } else {
      visitMessage = 'May not always be found here';
    }
  }
  return (
    <S.Container>
      <S.TextAddress numberOfLines={2} ellipsizeMode="tail">
        {item.address}
      </S.TextAddress>
      <S.TextType>{item.type_name}</S.TextType>
      <S.TextDistance>{`${item.distance}m away`}</S.TextDistance>
      {visitMessage ? (
        <S.VisitWrapper>
          <S.TextVisit>{visitMessage}</S.TextVisit>
        </S.VisitWrapper>
      ) : null}
    </S.Container>
  );
}

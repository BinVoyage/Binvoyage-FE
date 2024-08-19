import {NavigationProp, useNavigation} from '@react-navigation/native';
import * as S from 'components/binItem/BinItem.style';

export default function BinItem({item}: {item: BinItemProps}) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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
    <S.Container
      onPress={() => {
        console.log(item.bin_id);
        navigation.navigate('BinDetailNavigator', {
          screen: 'BinDetail',
          params: {bin_id: item.bin_id},
        });
      }}>
      <S.TextAddress numberOfLines={1} ellipsizeMode="tail">
        {item.address}
      </S.TextAddress>
      <S.TextType>{item.type_name}</S.TextType>
      <S.TextDistance>{`${Math.round(item.distance)}m away`}</S.TextDistance>
      {visitMessage ? (
        <S.VisitWrapper>
          <S.TextVisit>{visitMessage}</S.TextVisit>
        </S.VisitWrapper>
      ) : null}
    </S.Container>
  );
}

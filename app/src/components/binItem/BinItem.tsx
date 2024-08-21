import {NavigationProp, useNavigation} from '@react-navigation/native';
import * as S from 'components/binItem/BinItem.style';
import {useEffect, useState} from 'react';

export default function BinItem({item}: {item: BinItemProps}) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [labelText, setLabelText] = useState<string>('');
  const lableTextData = [
    'Most users found this bin!',
    'Some users found this bin!',
    'May not always be found here',
    'No visitors came here recently',
  ];

  useEffect(() => {
    console.log(item);
    if (!item.visit_rate) {
      if (!item.visit_count) {
        setLabelText(lableTextData[3]);
        return;
      }

      if (item.visit_rate >= 70) {
        setLabelText(lableTextData[0]);
      } else if (item.visit_rate >= 40) {
        setLabelText(lableTextData[1]);
      } else {
        setLabelText(lableTextData[2]);
      }
    }
  }, [item]);

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
      <S.VisitWrapper>
        <S.TextVisit>{labelText}</S.TextVisit>
      </S.VisitWrapper>
    </S.Container>
  );
}

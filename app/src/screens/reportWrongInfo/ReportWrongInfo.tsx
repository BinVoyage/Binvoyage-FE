import {NavigationProp, RouteProp, useNavigation} from '@react-navigation/native';
import api from 'api/api';
import ArrowPrevSvg from 'assets/images/ArrowPrevSvg';
import BinSvg from 'assets/images/BinSvg';
import CheckBoxFilledSvg from 'assets/images/CheckBoxFilledSvg';
import CheckBoxSvg from 'assets/images/CheckBoxSvg';
import {Palette} from 'constants/palette';
import {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import Toast from 'react-native-toast-message';
import * as S from 'screens/reportWrongInfo/ReportWrongInfo.style';

type ReportWrongInfoProps = {
  route: RouteProp<RootBinDetailParamList, 'ReportWrongInfo'>;
};

export default function ReportWrongInfo({route}: ReportWrongInfoProps) {
  const {bin_id, type_name, location_type_name, address, detail, image} = route.params;
  const [selected, setSelected] = useState<boolean[]>([false, false, false, false, false]);
  const [isValid, setIsValid] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<RootBinDetailParamList>>();

  const reportTypes = [
    'The location details are incorrect',
    'There is no trash bin around here',
    'The type of trash bin is different',
    'The navigation app isn’t connected',
    'The photo doesn’t match',
  ];

  const handleSelect = (index: number) => {
    const newSelected = [...selected];
    newSelected[index] = !newSelected[index];
    setSelected(newSelected);
  };

  const handleSubmit = async () => {
    const selectedReportTypes = reportTypes.filter((_, index) => selected[index]);
    try {
      await api.post(`/bin/report/${bin_id}`, {
        report_type_list: selectedReportTypes,
      });
      Toast.show({
        type: 'success',
        text1: 'Thank you for letting us know!',
        position: 'bottom',
        bottomOffset: 100,
        visibilityTime: 2000,
      });
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsValid(selected.some(item => item));
  }, [selected]);

  return (
    <S.Container>
      <S.ArrowPrevWrapper onPress={() => navigation.goBack()}>
        <ArrowPrevSvg width="24" height="24" fill={Palette.Gray4} />
      </S.ArrowPrevWrapper>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false} style={{marginBottom: 28}}>
        <S.RowWrapper style={{gap: 2}}>
          <BinSvg width="18" height="18" fill={type_name === 'Trash' ? Palette.Secondary2 : Palette.Primary} />
          <S.TextInfoB1>{type_name}</S.TextInfoB1>
        </S.RowWrapper>
        <S.Title>What details are incorrect?</S.Title>
        <S.AddressWrapper>
          <S.TextInfoB3>{address}</S.TextInfoB3>
        </S.AddressWrapper>
        <S.ImageArea />
        <S.DetailWrapper style={{marginBottom: 16}}>
          <S.RowWrapper style={{justifyContent: 'flex-start'}}>
            <S.TextLocationPrimary>Location details</S.TextLocationPrimary>
            <S.LabelLocation>
              <S.LabelLocationText>{location_type_name}</S.LabelLocationText>
            </S.LabelLocation>
          </S.RowWrapper>
          <S.TextLocationContents>{detail}</S.TextLocationContents>
        </S.DetailWrapper>
        <S.DetailWrapper>
          {reportTypes.map((type, index) => (
            <S.SelectWrapper key={index} isLast={index === reportTypes.length - 1}>
              <TouchableOpacity onPress={() => handleSelect(index)}>
                {selected[index] ? <CheckBoxFilledSvg width="24" height="24" fill={Palette.Primary} /> : <CheckBoxSvg width="24" height="24" />}
              </TouchableOpacity>
              <S.TextReportType>{type}</S.TextReportType>
            </S.SelectWrapper>
          ))}
        </S.DetailWrapper>
      </ScrollView>
      <S.Button onPress={handleSubmit} isValid={isValid} disabled={!isValid}>
        <S.ButtonText isValid={isValid}>Submit</S.ButtonText>
      </S.Button>
    </S.Container>
  );
}

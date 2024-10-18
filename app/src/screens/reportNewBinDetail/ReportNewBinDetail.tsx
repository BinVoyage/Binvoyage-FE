import {NavigationProp, RouteProp, useNavigation} from '@react-navigation/native';
import api from 'api/api';
import CancelSvg from 'assets/images/CancelSvg';
import LocationSvg from 'assets/images/LocationSvg';
import {Palette} from 'constants/palette';
import {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import Toast from 'react-native-toast-message';
import * as S from 'screens/reportNewBinDetail/ReportNewBinDetail.style';

type ReportNewBinProps = {
  route: RouteProp<RootReportNewBinParamList, 'ReportNewBinDetail'>;
}

export default function ReportNewBinDetail({route}: ReportNewBinProps) {
  const {address, coordinate} = route.params;
  const navigation = useNavigation<NavigationProp<RootReportNewBinParamList>>();
  const navigation2 = useNavigation<NavigationProp<RootHomeParamList>>();
  const binTypeLabel = ['Trash', 'Recycling'];
  const locationDetailLabel = ['Subway Entrance', 'Bus/Taxi Stop', 'Roadside', 'Square/Park', 'Other'];
  const [selectedBinTypeLabel, setSelectedBinTypeLabel] = useState<number>(-1);
  const [selectedLocationDetailLabel, setSelectedLocationDetailLabel] = useState<number>(-1);
  const placeholder = `In front of a store (e.g. Olive Young) or by the bus stop? More details will help fellow wanderers!`;
  const [content, setContent] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleSubmit = async () => {
    try {
      const response = await api.post(`/bin/new`, {
        address: address,
        lat: coordinate![0],
        lng: coordinate![1],
        detail: content,
        type_no: selectedBinTypeLabel === 0 ? 1 : 2,
        location_type_no: selectedLocationDetailLabel + 1,
        image: 'https://test.test/123',
      });
      if (response.data.success) {
        Toast.show({
          type: 'success',
            text1: 'Thank you for letting us know!',
            position: 'bottom',
            bottomOffset: 100,
            visibilityTime: 2000,
        });
        navigation2.navigate('Home');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Failed to submit. Please try again later.',
          position: 'bottom',
          bottomOffset: 100,
          visibilityTime: 2000,
        });
      }
    } catch (error: any) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Failed to submit. Please try again later.',
        position: 'bottom',
        bottomOffset: 100,
        visibilityTime: 2000,
      });
    }
  }

  useEffect(() => {
    if (selectedBinTypeLabel !== -1 && selectedLocationDetailLabel !== -1) {
      setIsValid(true);
      return;
    }
    setIsValid(false);
  }, [selectedBinTypeLabel, selectedLocationDetailLabel])

  return (
    <S.Container>
      <S.ArrowPrevWrapper onPress={() => navigation.goBack()}>
        <CancelSvg width="24" height="24" fill={Palette.Gray4} />
      </S.ArrowPrevWrapper>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false} style={{marginBottom: 30}}>
        <S.LocationWrapper>
          <LocationSvg width="24" height="24" fill={Palette.Primary} />
          <S.LocationText>{address}</S.LocationText>
        </S.LocationWrapper>
        <S.Title>{`Tell us more about the bin\nyou found`}</S.Title>
        <S.SubTitle>Bin type</S.SubTitle>
        <S.SelectWrapper style={{marginBottom: 24}}>
          {binTypeLabel.map((item, index) => (
            <S.SelectItem key={index} isSelected={selectedBinTypeLabel === index} onPress={() => setSelectedBinTypeLabel(index)}>
              <S.TextSelectItem isSelected={selectedBinTypeLabel === index}>{item}</S.TextSelectItem>
            </S.SelectItem>
          ))}
        </S.SelectWrapper>
        <S.SubTitle>Location details</S.SubTitle>
        <S.SelectWrapper>
          {locationDetailLabel.map((item, index) => (
            <S.SelectItem key={index} isSelected={selectedLocationDetailLabel === index} onPress={() => setSelectedLocationDetailLabel(index)}>
              <S.TextSelectItem isSelected={selectedLocationDetailLabel === index}>{item}</S.TextSelectItem>
            </S.SelectItem>
          ))}
        </S.SelectWrapper>
        <S.ReviewInput
          value={content}
          onChangeText={setContent}
          placeholder={placeholder}
          placeholderTextColor={Palette.Gray4}
          multiline
          textAlignVertical="top"
        />
        <S.AddPicture>
          <S.IconAddPicture source={require('assets/images/AddImage.png')} />
          <S.SubTitle style={{textAlign: 'center', marginBottom: 0}}>Upload a photo of the bin (Optional)</S.SubTitle>
          <S.TextB3>You can upload only one photo!</S.TextB3>
        </S.AddPicture>
      </ScrollView>
      <S.Button disabled={!isValid} isValid={isValid} onPress={handleSubmit}>
        <S.ButtonText isValid={isValid}>Submit</S.ButtonText>
      </S.Button>
    </S.Container>
  );
}

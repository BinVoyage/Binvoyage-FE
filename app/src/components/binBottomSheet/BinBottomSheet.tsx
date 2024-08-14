import BottomSheet, {BottomSheetBackdrop, BottomSheetView} from '@gorhom/bottom-sheet';
import {Palette} from 'constants/palette';
import {useRef, useMemo, useEffect, useState, useCallback} from 'react';
import {Dimensions, StyleSheet, View, TouchableOpacity} from 'react-native';
import * as S from 'components/binBottomSheet/BinBottomSheet.style';
import ArrowUpBtnSvg from 'assets/images/ArrowUpBtnSvg';
import ArrowNextSvg from 'assets/images/ArrowNextSvg';
import BinSvg from 'assets/images/BinSvg';
import FootPrintSvg from 'assets/images/FootPrintSvg';
import api from 'api/api';
import {mapStore} from 'store/Store';
import {NavigationProp, useNavigation} from '@react-navigation/native';

interface Props {
  bin_id: number;
  isOpen: boolean;
  onSheetChange: (offset: number) => void;
}

export default function BinBottomSheet({bin_id, isOpen, onSheetChange}: Props) {
  const height = Dimensions.get('window').height;
  const bottomSheetRef = useRef<BottomSheet>(null);
  const bottomSheetHeight = Math.round(137 / 689 * height); 
  const bottomSheetHeightWithImg = Math.round(269 / 689 * height); 
  const snapPointsWithImg = useMemo(() => [bottomSheetHeightWithImg, bottomSheetHeightWithImg], []);
  const snapPoints = useMemo(() => [bottomSheetHeight, bottomSheetHeight], []);
  const [binData, setBinData] = useState<BinDetail | null>(null);
  const currentLocation = mapStore(state => state.currentPosition);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasImg, setHasImg] = useState<boolean | null>(false);

  // const handleSheetChanges = (index: number) => {
  //   const offset = index === 0 ? 0 : height * (bottomSheetHeight) / 100;
  //   onSheetChange(offset);
  // };

  useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.snapToIndex(0);
      return;
    }
    bottomSheetRef.current?.close();
  }, [isOpen])

  useEffect(() => {
    const getBinData = async () => {
      try {
        // const response = await api.get<BinDetailResponse>(`/bin/search/${bin_id}`);
        const response = await api.get<BinDetailResponse>(`/bin/search/${bin_id}?lat=${currentLocation?.latitude}&lng=${currentLocation?.longitude}`);
        setBinData(response.data.data);
        setIsLoading(false);

        response.data.data.image ? setHasImg(true) : setHasImg(false);
      } catch (error: any) {
        console.log(error);
      }
    };

    getBinData();
  }, []);

  return (
      <BottomSheet
        ref={bottomSheetRef}
        index={isOpen ? 0 : -1}
        snapPoints={hasImg ? snapPointsWithImg : snapPoints}
        backgroundStyle={styles.container}
        // onChange={handleSheetChanges}
        // backdropComponent={renderBackdrop}
        handleIndicatorStyle={{display: 'none'}}
        enableHandlePanningGesture={false}
        enableOverDrag={false}
        enablePanDownToClose={false}>
        <BottomSheetView style={styles.wrapper}>
          <S.RowWrapper style={{justifyContent: 'space-between'}}>
            <S.TopLabel>
              <S.TopLabelText>Most users found this bin!</S.TopLabelText>
            </S.TopLabel>
            <S.ArrowUpWrapper
              onPress={() => {
                console.log(bin_id);
                navigation.navigate('BinDetailNavigator', {
                  screen: 'BinDetail',
                  params: {bin_id},
                });
              }}>
              <ArrowUpBtnSvg width="32" height="32" />
            </S.ArrowUpWrapper>
          </S.RowWrapper>
          {isLoading ? <S.Title>isLoading...</S.Title> : <S.Title>{binData?.address}</S.Title>}
          <S.RowWrapper style={{justifyContent: 'space-between'}}>
            <S.RowWrapper>
              <S.RowWrapper>
                <BinSvg width="18" height="18" fill={Palette.Gray4} />
                {isLoading ? <S.TextInfo1>isLoading...</S.TextInfo1> : <S.TextInfo1>{binData?.type_name}</S.TextInfo1>}
              </S.RowWrapper>
              <S.Division />
              <S.RowWrapper>
                <FootPrintSvg width="24" height="24" fill={Palette.Gray4} />
                {isLoading ? <S.TextInfo1>isLoading...</S.TextInfo1> : <S.TextInfo1>{Math.round(binData!.distance)}m</S.TextInfo1> }
              </S.RowWrapper>
            </S.RowWrapper>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('BinDetailNavigator', {
                  screen: 'ReportWrongInfo', 
                  params: {
                    bin_id: binData?.bin_id ?? -1,
                    type_name: binData?.type_name ?? '',
                    location_type_name: binData?.location_type_name ?? '',
                    address: binData?.address ?? '',
                    detail: binData?.detail ?? '',
                    image: binData?.image ?? '',
                    isVerifyVisit: false,
                  }
                })
              }>
              <S.RowWrapper>
                <S.TextWrongInfo>Wrong Info?</S.TextWrongInfo>
                <ArrowNextSvg width="14" height="14" fill={Palette.Primary} />
              </S.RowWrapper>
            </TouchableOpacity>
          </S.RowWrapper>
          {!isLoading && hasImg ? <S.ImageArea /> : null}
        </BottomSheetView>
      </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 8,
    // zIndex: 2,
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    zIndex:3
  },
  bottomSheetBackground: {
    backgroundColor: 'transparent'
  },
});

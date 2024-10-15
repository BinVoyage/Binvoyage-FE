import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {Palette} from 'constants/palette';
import {useRef, useMemo, useState, useEffect} from 'react';
import {Dimensions, StyleSheet, ViewStyle} from 'react-native';

interface Props {
  onSheetChange: (offset: number) => void;
  children: React.ReactNode;
  wrapperStyle?: ViewStyle;
}

export default function MyBottomSheet({onSheetChange, children, wrapperStyle}: Props) {
  const height = Dimensions.get('window').height;
  // const [index, setIndex] = useState<number>(1);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const bottomSheetHeight = height > 700 ? '25%' : '30%';
  const snapPoints = useMemo(() => ['3%', bottomSheetHeight], [bottomSheetHeight]);

  const handleSheetChanges = (index: number) => {
    // index를 사용하여 바텀싯이 어느 정도 열려있는지 확인하고 offset 계산
    const offset = index === 0 ? 0 : height * (parseFloat(bottomSheetHeight) / 100);
    onSheetChange(offset);
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      backgroundStyle={styles.container}
      handleIndicatorStyle={styles.handleIndicator}
      onChange={handleSheetChanges}>
      <BottomSheetView style={[styles.wrapper, wrapperStyle]}>{children}</BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  handleIndicator: {
    width: 53,
    height: 4,
    borderRadius: 2,
    backgroundColor: Palette.Gray3,
  },
  container: {
    borderRadius: 20,
    shadowColor: '#000', // 그림자 색상
    shadowOffset: {
      width: 0,
      height: -4, // 위쪽으로 그림자
    },
    shadowOpacity: 0.12, // 그림자 불투명도
    shadowRadius: 8, // 그림자 반경
    elevation: 8, // 안드로이드 그림자 효과
  },
  wrapper: {
    flex: 1,
    paddingLeft: 16,
    paddingBottom: 24,
    marginTop: 10,
  },
});

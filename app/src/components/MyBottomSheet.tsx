import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {Palette} from 'constants/palette';
import {useRef, useMemo} from 'react';
import {StyleSheet} from 'react-native';

export default function MyBottomSheet({children}: {children: React.ReactNode}) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['3%', '25%'], []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      backgroundStyle={styles.container}
      handleIndicatorStyle={styles.handleIndicator}>
      <BottomSheetView style={styles.wrapper}>{children}</BottomSheetView>
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

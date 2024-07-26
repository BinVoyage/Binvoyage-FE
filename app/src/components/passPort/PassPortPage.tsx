import * as S from 'components/passPort/PassPortPage.style';
import {Dimensions, ImageSourcePropType} from 'react-native';

interface DummyItem {
  id: number;
}

interface Props {
  stampList: DummyItem[];
}

const {width, height} = Dimensions.get('window');

const stampImages: Record<number, ImageSourcePropType> = {
  0: require('assets/images/img_stamp_0.png'),
  1: require('assets/images/img_stamp_1.png'),
  2: require('assets/images/img_stamp_2.png'),
  3: require('assets/images/img_stamp_3.png'),
  4: require('assets/images/img_stamp_4.png'),
  5: require('assets/images/img_stamp_5.png'),
};

const positionOffsets = [
  {top: height * 0.02, left: width * 0.05, zIndex: 2},
  {top: height * 0.05, left: width * 0.45, zIndex: 1},
  {top: height * 0.18, left: width * 0.1, zIndex: 2},
  {top: height * 0.25, left: width * 0.4, zIndex: 1},
  {top: height * 0.37, left: width * 0.1, zIndex: 2},
  {top: height * 0.47, left: width * 0.4, zIndex: 1},
];

export default function PassPortPage({stampList}: Props) {
  return (
    <S.Container>
      {stampList.map((stamp, index) => {
        const {top, left, zIndex} = positionOffsets[index % positionOffsets.length]; // 인덱스에 따라 top과 left 값을 가져옵니다.
        return <S.StampWrapper key={stamp.id} source={stampImages[stamp.id]} resizeMode="contain" top={top} left={left} zIndex={zIndex} />;
      })}
    </S.Container>
  );
}

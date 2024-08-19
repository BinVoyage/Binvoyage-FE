import * as S from 'components/passPort/PassPortPage.style';
import {Dimensions, ImageSourcePropType} from 'react-native';

// interface Dummy {
//   stamp_id: number;
// }

interface Props {
  stampList: StampInfo[];
  isLoading: boolean;
}

const {width, height} = Dimensions.get('window');

// const stampImages: Record<number, ImageSourcePropType> = {
//   0: require('assets/images/stamp/graphic0.png'),
//   1: require('assets/images/stamp/graphic1.png'),
//   2: require('assets/images/stamp/graphic2.png'),
//   3: require('assets/images/stamp/graphic3.png'),
//   4: require('assets/images/stamp/graphic4.png'),
//   5: require('assets/images/stamp/graphic5.png'),
//   6: require('assets/images/stamp/graphic6.png'),
// };

const positionOffsets = [{top: 0}, {top: 60}, {top: -30}, {top: 40}, {top: -30}, {top: 20}];

export default function PassPortPage({stampList, isLoading}: Props) {
  const filledStampList = [...stampList];
  const stampsPerPage = 6;

  if (stampList.length < stampsPerPage) {
    const dummyStamps = Array.from({length: stampsPerPage - stampList.length}, () => ({stamp_id: 0, image: 'assets/images/stamp/graphic0.png'}));
    filledStampList.push(...dummyStamps);
  }

  return (
    <S.Container>
      <S.Inner>
        {!isLoading &&
          filledStampList.map((stamp, index) => {
            const {top} = positionOffsets[index % positionOffsets.length];
            if (stamp.stamp_id === 0) {
              return <S.StampWrapper key={index} source={require('assets/images/stamp/graphic0.png')} resizeMode="contain" top={top} />;
            }
            return <S.StampWrapper key={index} source={{uri: stamp.image}} resizeMode="contain" top={top} />;
          })}
      </S.Inner>
    </S.Container>
  );
}

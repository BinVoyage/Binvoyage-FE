import {NavigationProp, useNavigation} from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import * as S from 'screens/onBoarding/OnBoarding.style';
import {Dimensions, ImageSourcePropType} from 'react-native';
import {useRef, useState} from 'react';

type RenderItemProps = {
  text: string;
  src: ImageSourcePropType;
  paddingTop: number;
};

export default function Onboarding() {
  const {width, height} = Dimensions.get('window');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [step, setStep] = useState<number>(0);
  const carouselRef = useRef<Carousel<RenderItemProps>>(null);
  const data: RenderItemProps[] = [
    {text: `Find the nearest bin\nwith BinVoyage`, src: require('assets/images/img-onboarding1.png'), paddingTop: Math.round((height * 39) / 812)},
    {text: 'Navigate to your nearest bin', src: require('assets/images/img-onboarding2.png'), paddingTop: Math.round((height * 94) / 812)},
    {text: `Verify your visit\nand collect stamps!`, src: require('assets/images/img-onboarding3.png'), paddingTop: Math.round((height * 94) / 812)},
    {text: `Check out your\nstamp collection`, src: require('assets/images/img-onboarding4.png'), paddingTop: Math.round((height * 39) / 812)},
    {text: 'Report and let us fix!', src: require('assets/images/img-onboarding5.png'), paddingTop: Math.round((height * 39) / 812)},
  ];

  const goNext = () => {
    if (carouselRef.current) {
      carouselRef.current.snapToNext();
    }
  };

  const goLogin = () => {
    navigation.navigate('Login');
  };

  const renderItem = ({item}: {item: RenderItemProps}) => (
    <S.Container style={{paddingTop: item.paddingTop}}>
      <S.BgImg source={item.src} resizeMode="contain" />
    </S.Container>
  );

  return (
    <>
      <Carousel ref={carouselRef} renderItem={renderItem} data={data} sliderWidth={width} itemWidth={width} onSnapToItem={index => setStep(index)} />
      <S.Modal>
        <S.Pagination>
          {data.map((_, index) => {
            if (index === step) {
              return <S.CurrentDot key={index} />;
            }
            return <S.Dot key={index} />;
          })}
        </S.Pagination>
        <S.Text>{data[step].text}</S.Text>
        <S.Button type={step < 4 ? 'next' : 'start'} onPress={step < 4 ? goNext : goLogin}>
          <S.ButtonText type={step < 4 ? 'next' : 'start'}>{step < 4 ? 'next' : 'start'}</S.ButtonText>
        </S.Button>
      </S.Modal>
    </>
  );
}

import Swiper from 'react-native-swiper';
import {useRef} from 'react';
import Onboarding1 from 'screens/onBoarding/OnBoarding1';
import Onboarding2 from 'screens/onBoarding/OnBoarding2';
import Onboarding3 from 'screens/onBoarding/OnBoarding3';
import {NavigationProp, useNavigation} from '@react-navigation/native';

export default function Onboarding() {
  const swiperRef = useRef<Swiper>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const goNext = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1);
    }
  };

  const goLogin = () => {
    navigation.navigate('Login');
  };
  return (
    <Swiper ref={swiperRef} loop={false} showsPagination={false}>
      <Onboarding1 onNext={goNext} />
      <Onboarding2 onNext={goNext} />
      <Onboarding3 onStart={goLogin} />
    </Swiper>
  );
}

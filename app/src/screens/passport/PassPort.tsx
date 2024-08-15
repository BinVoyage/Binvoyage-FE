import {NavigationProp, useNavigation} from '@react-navigation/native';
import api from 'api/api';
import ArrowPrevSvg from 'assets/images/ArrowPrevSvg';
import PassPortPage from 'components/passPort/PassPortPage';
import {Palette} from 'constants/palette';
import {useEffect, useRef, useState} from 'react';
import Swiper from 'react-native-swiper';
import * as S from 'screens/passport/PassPort.style';

export default function PassPort() {
  const swiperRef = useRef<Swiper>(null);
  const navigation = useNavigation<NavigationProp<RootHomeParamList>>();
  // const [stampList, setStampList] = useState<StampInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get('/stamp');
        // setStampList(response.data.data.user_stamp_list);
        // setIsLoading(false);
      } catch (error: any) {
        console.log('error: ' + error.response);
      }
    };

    getData();
  }, []);

  const stampList = [{stamp_id: 1}, {stamp_id: 2}, {stamp_id: 3}, {stamp_id: 4}, {stamp_id: 5}, {stamp_id: 6}, {stamp_id: 6}, {stamp_id: 6}];
  const dummy = [{stamp_id: 1}, {stamp_id: 2}, {stamp_id: 3}, {stamp_id: 4}, {stamp_id: 5}, {stamp_id: 6}];

  const stampsPerPage = 6;
  const totalPages = Math.ceil(stampList.length / stampsPerPage);

  return (
    <S.Container>
      <S.Header>
        <S.ArrowPrevWrapper onPress={() => navigation.navigate('Home')}>
          <ArrowPrevSvg width="9" height="16" fill={Palette.Gray3} />
        </S.ArrowPrevWrapper>
        <S.Title>Your BinVoyage so far</S.Title>
      </S.Header>
      <Swiper
        ref={swiperRef}
        loop={false}
        renderPagination={index => {
          return (
            <S.Pagination>
              {Array.from({length: totalPages}).map((_, i) => (i === index ? <S.CurrentDot key={i} /> : <S.Dot key={i} />))}
            </S.Pagination>
          );
        }}>
        {Array.from({length: totalPages}).map((_, pageIndex) => {
          const start = pageIndex * stampsPerPage;
          const end = start + stampsPerPage;
          const stampsForPage = (stampList.length ? stampList : dummy).slice(start, end);
          return <PassPortPage key={pageIndex} stampList={stampsForPage} isLoading={isLoading} />;
        })}
      </Swiper>
    </S.Container>
  );
}

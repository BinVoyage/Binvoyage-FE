import {NavigationProp, useNavigation} from '@react-navigation/native';
import api from 'api/api';
import ArrowPrevSvg from 'assets/images/ArrowPrevSvg';
import ReviewItem from 'components/reviewItem/ReviewItem';
import {Palette} from 'constants/palette';
import {useEffect, useRef, useState} from 'react';
import {FlatList, Text, TouchableOpacity} from 'react-native';
import * as S from 'screens/feedbackList/FeedbackList.style';

export default function FeedbackList() {
  const navigation = useNavigation<NavigationProp<RootBinDetailParamList>>();
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const scrollViewRef = useRef<FlatList>(null);

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToOffset({offset: 0, animated: true});
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get<FeedbackResponse>('/bin/feedback/1/?page=1');
        setFeedbackList(response.data.data.feedback_list);
        console.log(response.data.msg);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  return (
    <S.Container>
      <S.ArrowPrevWrapper onPress={() => navigation.goBack()}>
        <ArrowPrevSvg width="24" height="24" fill={Palette.Gray4} />
      </S.ArrowPrevWrapper>
      <S.DetailTitle>
        After-visit feedback <Text style={{color: Palette.Primary}}>{feedbackList.length}</Text>
      </S.DetailTitle>
      <FlatList
        ref={scrollViewRef}
        data={feedbackList}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.feedback_id.toString()}
        renderItem={({item, index}) => (
          <ReviewItem
            feedbackId={item.feedback_id}
            date={item.registration_dt}
            author={item.user_name}
            content={item.content}
            isLast={index === feedbackList.length - 1}
          />
        )}
      />
      <TouchableOpacity onPress={scrollToTop}>
        <S.BtnScrollUp source={require('assets/images/u_button.png')} resizeMode="contain" />
      </TouchableOpacity>
    </S.Container>
  );
}

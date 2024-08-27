import {NavigationProp, RouteProp, useNavigation} from '@react-navigation/native';
import api from 'api/api';
import ArrowPrevSvg from 'assets/images/ArrowPrevSvg';
import ReviewItem from 'components/reviewItem/ReviewItem';
import {Palette} from 'constants/palette';
import {useEffect, useRef, useState} from 'react';
import {Alert, FlatList, Text, TouchableOpacity} from 'react-native';
import Toast from 'react-native-toast-message';
import * as S from 'screens/feedbackList/FeedbackList.style';
import { userStore } from 'store/Store';
import { formatDate } from 'utils/formatDate';

type FeedbackListProps = {
  route: RouteProp<RootBinDetailParamList, 'FeedbackList'>;
};

export default function FeedbackList({route}: FeedbackListProps) {
  const {bin_id} = route.params;
  const navigation = useNavigation<NavigationProp<RootBinDetailParamList>>();
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const userInfo = userStore(state => state.userInfo);
  const scrollViewRef = useRef<FlatList>(null);

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToOffset({offset: 0, animated: true});
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/bin/feedback/${bin_id}?page=1`);

        if (response.data.success) {
          setFeedbackList(response.data.data.feedback_list);
        }
      } catch (error: any) {
        console.log(error.response.data);
      }
    };

    getData();
  }, []);

  const deleteFeedback = async (feedbackId: number) => {
    Alert.alert(
      'Delete Feedback',
      'Are you sure you want to delete this feedback?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              const response = await api.delete(`bin/feedback/${feedbackId}`);
              if (response.status === 200) {
                console.log('Feedback deleted successfully');
                const filteredList = feedbackList.filter(item => item.feedback_id !== feedbackId);
                setFeedbackList(filteredList);
              } else {
                Toast.show({
                  type: 'error',
                  text1: 'Failed to delete feedback. Please try again later.',
                  position: 'bottom',
                  bottomOffset: 100,
                  visibilityTime: 2000,
                });
              }
            } catch (error) {
              Toast.show({
                type: 'error',
                text1: 'Failed to delete feedback. Please try again later.',
                position: 'bottom',
                bottomOffset: 100,
                visibilityTime: 2000,
              });
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <S.Container>
      <S.ArrowPrevWrapper onPress={() => navigation.goBack()}>
        <ArrowPrevSvg width="9" height="16" fill={Palette.Gray4} />
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
            isMyFeedback={userInfo?.user_id === item.user_id}
            feedbackId={item.feedback_id}
            date={formatDate(item.registration_dt)}
            author={item.user_name}
            content={item.content}
            isLast={index === feedbackList.length - 1}
            onDelete={deleteFeedback}
          />
        )}
      />
      <TouchableOpacity onPress={scrollToTop}>
        <S.BtnScrollUp source={require('assets/images/u_button.png')} resizeMode="contain" />
      </TouchableOpacity>
    </S.Container>
  );
}

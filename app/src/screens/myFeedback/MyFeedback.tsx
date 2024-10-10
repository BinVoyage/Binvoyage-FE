import {FlatList, Alert} from 'react-native';
import {Palette} from 'constants/palette';
import ArrowPrevSvg from 'assets/images/ArrowPrevSvg';
import BinSvg from 'assets/images/BinSvg';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import api from 'api/api';
import S_Recycling from 'assets/images/S_Recycling';
import Toast from 'react-native-toast-message';
import DeleteSvg from 'assets/images/DeleteSvg';
import * as S from 'screens/myFeedback/MyFeedback.style'

export default function MyFeedback() {
  const navigator = useNavigation<NavigationProp<RootMyParamList>>();
  const [feedback, setFeedback] = useState<MyFeedback[]>([]);

  const getData = async () => {
    try {
      const response = await api.get('user/feedback');
      const feedbackList = response.data.data.feedback_list;
      setFeedback(feedbackList.reverse()); // 최신 순 정렬
    } catch (error) {
      console.error(error);
    }
  };

  const deleteComment = async (feedback_id: number) => {
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
              const response = await api.delete(`bin/feedback/${feedback_id}`);
              if (response.status === 200) {
                setFeedback(prev => prev.filter(item => item.feedback_id !== feedback_id));
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
              console.log(error);
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

  useEffect(() => {
    getData();
  }, []);

  const FeedbackItem = ({feedback_id, registration_dt, content, bin_address, bin_type_name, bin_type_no}: MyFeedback) => (
    <S.ItemWrapper>
    <S.RowWrapper style={{ justifyContent: 'space-between' }}>
      <S.RowWrapper>
        {bin_type_no === 1 ? (
          <BinSvg width="18" height="18" fill={Palette.Secondary2} />
        ) : (
          <S_Recycling width="18" height="18" fill={Palette.Primary} />
        )}
        <S.BinText>{bin_type_name}</S.BinText>
        <S.Division />
        <S.BinText>{registration_dt?.substring(0, 10)}</S.BinText>
      </S.RowWrapper>
      <S.DeletedSvgWrapper onPress={() => deleteComment(feedback_id)}>
        <DeleteSvg width="15" height="17" fill={Palette.Gray4} />
      </S.DeletedSvgWrapper>
    </S.RowWrapper>
    <S.AddressText>{bin_address}</S.AddressText>
    <S.ContentText>{content}</S.ContentText>
    <S.Line />
  </S.ItemWrapper>
  );

  return (
    <S.Wrapper>
    <S.ArrowPrevWrapper onPress={() => navigator.navigate('MyPage')}>
      <ArrowPrevSvg width="9" height="16" fill={Palette.Gray4} />
    </S.ArrowPrevWrapper>
    <FlatList
      data={feedback}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item.feedback_id.toString()}
      onEndReachedThreshold={0.8}
      renderItem={({ item }) => (
        <FeedbackItem
          bin_id={item.bin_id}
          bin_type_no={item.bin_type_no}
          bin_type_name={item.bin_type_name}
          feedback_id={item.feedback_id}
          registration_dt={item.registration_dt}
          content={item.content}
          bin_address={item.bin_address}
        />
      )}
    />
  </S.Wrapper>
  );
}



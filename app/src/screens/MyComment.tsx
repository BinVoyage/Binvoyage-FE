import {Text, View, FlatList, Alert} from 'react-native';
import styled from 'styled-components/native';
import {Palette} from 'constants/palette';
import ArrowPrevSvg from 'assets/images/ArrowPrevSvg';
import BinSvg from 'assets/images/BinSvg';
import {Typo} from 'constants/typo';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import api from 'api/api';
import S_Recycling from 'assets/images/S_Recycling';
import Toast from 'react-native-toast-message';
import DeleteSvg from 'assets/images/DeleteSvg';

export default function MyComment() {
  const commentNavigator = useNavigation<NavigationProp<RootMyParamList>>();
  const [comment, setComment] = useState<MyFeedback[]>([]);

  const getData = async () => {
    try {
      const response = await api.get('user/feedback');
      const feedbackList = response.data.data.feedback_list;
      setComment(feedbackList.reverse()); // 최신 순 정렬
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
                setComment(prevComments => prevComments.filter(comment => comment.feedback_id !== feedback_id));
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
    <ItemWrapper>
      <RowWrapper style={{justifyContent: 'space-between'}}>
        <RowWrapper>
          {bin_type_no === 1 ? (
            <BinSvg width="18" height="18" fill={Palette.Secondary2} />
          ) : (
            <S_Recycling width="18" height="18" fill={Palette.Primary} />
          )}
          <BinText>{bin_type_name}</BinText>
          <Division />
          <BinText>{registration_dt?.substring(0, 10)}</BinText>
        </RowWrapper>
        <DeletedSvgWrapper onPress={() => deleteComment(feedback_id)}>
          <DeleteSvg width="15" height="17" fill={Palette.Gray4} />
        </DeletedSvgWrapper>
      </RowWrapper>
      <AddressText>{bin_address}</AddressText>
      <ContentText>{content}</ContentText>
      <Line />
    </ItemWrapper>
  );

  return (
    <CommentWrapper>
      <BackDropBox onPress={() => commentNavigator.navigate('MyPage')}>
        <ArrowPrevSvg width="24" height="24" fill={Palette.Gray4} />
      </BackDropBox>
      <FlatList
        data={comment}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.feedback_id.toString()}
        onEndReachedThreshold={0.8}
        renderItem={({item}) => (
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
    </CommentWrapper>
  );
}

const CommentWrapper = styled.View`
  width: 100%;
  flex: 1;
  background: ${Palette.White};
  padding: 13px 16px;
`;

const BackDropBox = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  margin-bottom: 16px;
`;

const ItemWrapper = styled.View`
  width: 100%;
  margin-bottom: 12px;
  border-bottom: 1px solid;
`;

const RowWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const BinText = styled.Text`
  align-content: space-between;
  font-size: ${Typo.B3.fontSize};
  font-weight: ${Typo.B3.fontWeight};
  color: ${Palette.Gray5};
  margin-left: 4px;
`;

const Division = styled.View`
  width: 1px;
  height: 16px;
  background: ${Palette.Gray4};
  margin: 0px 8px;
`;

const DeletedSvgWrapper = styled.TouchableOpacity`
  width: 15px;
  height: 17px;
`;

const AddressText = styled.Text`
  font-size: ${Typo.Title2.fontSize};
  font-weight: ${Typo.Title2.fontWeight};
  color: ${Palette.Black};
  margin-bottom: 8px;
`;

const ContentText = styled.Text`
  font-size: ${Typo.B3.fontSize};
  font-weight: ${Typo.B3.fontWeight};
  color: ${Palette.Gray6};
  margin-bottom: 8px;
`;

const Line = styled.View`
  width: 200%;
  height: 1px;
  align-self: stretch;
  background-color: #e4e6ea;
`;

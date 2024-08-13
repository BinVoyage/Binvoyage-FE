import {Text, View, FlatList} from 'react-native';
import styled from 'styled-components/native';
import {Palette} from 'constants/palette';
import ArrowPrevSvg from 'assets/images/ArrowPrevSvg';
import BinSvg from 'assets/images/BinSvg';
import {Typo} from 'constants/typo';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import api from 'api/api';
import FeedbackList from './feedbackList/FeedbackList';

export default function MyComment() {
  const CommentNavigator = useNavigation<NavigationProp<RootMyParamList>>();
  const [comment, setComment] = useState<Mycomment[]>([]);

  const CommentsData = async () => {
    try {
      const response = await api.get<MyCommentResponse>('/user/feedback');
      setComment(response.data.data.feedback_list);
      console.log(response.data.data.feedback_list);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    CommentsData();
  }, []);

  type ItemProps = {
    bin_type_name: string;
    feedback_id: number;
    registration_dt?: string;
    change_dt?: string;
    content?: string;
    bin_id?: number;
    bin_address?: string;
  };

  const CommentItem = ({registration_dt, content, bin_address, bin_type_name}: ItemProps) => (
    <ItemWrapper>
      <ItemTopWrapper>
        <MyImage source={require('assets/images/s_bin.png')} style={{alignItems: 'center'}} />
        <Text>{bin_type_name}</Text>
        <ItemName>
          <Text>|</Text>
        </ItemName>
        <Text>{registration_dt?.substring(0, 10)}</Text>
        <Deleted>
          <BinSvg width="24px" height="24px" fill="#9DA0A8" />
        </Deleted>
      </ItemTopWrapper>
      <AddressText>{bin_address}</AddressText>
      <ContentText>{content}</ContentText>
      <Line />
    </ItemWrapper>
  );

  // const handleDelete = async() =>{
  //   try {
  //     await api.delete(`/bin/feedback/${comm}`);
  //     console.log('성공');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <CommentWrapper>
      <BackDropBox onPress={() => CommentNavigator.navigate('MyPage')}>
        <ArrowPrevSvg width="24px" height="24px" fill="#5A5E6A" />
      </BackDropBox>
      <FlatList
        data={comment}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.feedback_id.toString()}
        onEndReachedThreshold={0.8}
        renderItem={({item}) => (
          <CommentItem
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
  height: 800px;
  background: ${Palette.White};
  display: flex;
`;

const BackDropBox = styled.TouchableOpacity`
  align-items: left;
  padding-left: 16px;
  padding-top: 13px;
`;

const ListBox = styled.FlatList`
  padding-top: 16px;
  flex-grow: 1;
`;

const ItemWrapper = styled.View`
  width: 343px;
  height: 117px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid;
`;

const ItemTopWrapper = styled.View`
  display: flex;
  flex-direction: row;
`;

const ItemName = styled.View`
  padding-right: 8px;
  padding-left: 8px;
`;
const MyImage = styled.Image`
  align-content: center;
  padding-right: 8px;
`;
const Deleted = styled.View`
  padding-left: 330px;
  padding-right: 16px;
  align-items: right;
  position: absolute;
`;

const AddressText = styled.Text`
  font-size: ${Typo.Title2.fontSize};
  font-weight: ${Typo.Title2.fontWeight};
  padding-bottom: 8px;
`;

const ContentText = styled.Text`
  font-size: ${Typo.B3.fontSize};
  font-weight: ${Typo.B3.fontWeight};
  padding-bottom: 8px;
`;

const Line = styled.View`
  width: 200%;
  height: 1px;
  align-self: stretch;
  background-color: #e4e6ea;
`;

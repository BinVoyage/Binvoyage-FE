import {Text, View, FlatList} from 'react-native';
import styled from 'styled-components/native';
import {Palette} from 'constants/palette';
import ArrowPrevSvg from 'assets/images/ArrowPrevSvg';
import BinSvg from 'assets/images/BinSvg';
import {Typo} from 'constants/typo';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import api from 'api/api';
import S_Bin from 'assets/images/S_Bin';
import S_Recycling from 'assets/images/S_Recycling';

export default function MyComment() {
  const commentNavigator = useNavigation<NavigationProp<RootMyParamList>>();
  const [comment, setComment] = useState<Mycomment[]>([]);

  const getData = async () => {
    try {
      const response = await api.get('user/feedback');
      setComment(response.data.data.feedback_list);
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteComment = async (feedback_id: number) => {
    try {
      const response = await api.delete(`bin/feedback/${feedback_id}`);
      if (response.status === 200) {
        setComment(prevComments => prevComments.filter(comment => comment.feedback_id !== feedback_id));
      } else {
        console.log('Failed to delete the comment');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  type ItemProps = {
    bin_type_name: string | any;
    feedback_id: number;
    registration_dt?: string;
    change_dt?: string;
    content?: string;
    bin_id?: number;
    bin_address?: string;
    [key: string]: any;
  };

  const CommentItem = ({feedback_id, registration_dt, content, bin_address, bin_type_name}: ItemProps) => (
    <ItemWrapper>
      <RowWrapper style={{justifyContent: 'space-between'}}>
        <RowWrapper>
          {bin_type_name === 'Trash' && <S_Bin />}
          {bin_type_name === 'Recycling' && <S_Recycling />}
          <BinText>{bin_type_name}</BinText>
          <ItemName>
            <Text>|</Text>
          </ItemName>
          <Text>{registration_dt?.substring(0, 10)}</Text>
        </RowWrapper>
        <Deleted onPress={() => deleteComment(feedback_id)}>
          <BinSvg width="15px" height="17px" fill="#9DA0A8" />
        </Deleted>
      </RowWrapper>
      <AddressText>{bin_address}</AddressText>
      <ContentText>{content}</ContentText>
      <Line />
    </ItemWrapper>
  );

  return (
    <CommentWrapper>
      <BackDropBox onPress={() => commentNavigator.navigate('MyPage')}>
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
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ItemName = styled.View`
  margin: 0px 8px;
`;

const BinText = styled.Text`
  align-content: space-between;
  font-size: ${Typo.B3.fontSize};
  font-weight: ${Typo.B3.fontWeight};
  margin-left: 4px;
`;
const Deleted = styled.TouchableOpacity`
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
  margin-bottom: 8px;
`;

const Line = styled.View`
  width: 200%;
  height: 1px;
  align-self: stretch;
  background-color: #e4e6ea;
`;

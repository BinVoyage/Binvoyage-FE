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

  const CommentsData = async () => {
    try {
      const response = await api.get('user/feedback');
      setComment(response.data.data.feedback_list);
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    CommentsData();
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

  const CommentItem = ({registration_dt, content, bin_address, bin_type_name}: ItemProps) => (
    <ItemWrapper>
      <ItemTopWrapper>
        {bin_type_name === 'Trash' && <S_Bin />}
        {bin_type_name === 'Recycling' && <S_Recycling />}
        <BinText>{bin_type_name}</BinText>
        <ItemName>
          <Text>|</Text>
        </ItemName>
        <Text>{registration_dt?.substring(0, 10)}</Text>
        <Deleted>
          <BinSvg width="15px" height="17px" fill="#9DA0A8" />
        </Deleted>
      </ItemTopWrapper>
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
  width: 100%;
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

const BinText = styled.Text`
  align-content: space-between;
  font-size: ${Typo.B3.fontSize};
  font-weight: ${Typo.B3.fontWeight};
`;
const Deleted = styled.Pressable`
  padding-left: 330px;
  padding-right: 16px;
  align-items: right;
  position: absolute;
`;

const AddressText = styled.Text`
  font-size: ${Typo.Title2.fontSize};
  font-weight: ${Typo.Title2.fontWeight};
  color: ${Palette.Black};
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

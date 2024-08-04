import {Palette} from 'constants/palette';
import {Image, Text, View, ScrollView} from 'react-native';
import styled from 'styled-components/native';
import CloseSvg from 'assets/images/CloseSvg';
import DefaultText from 'components/DefaultText';
import {Typo} from 'constants/typo';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import NewTrashLocation from 'assets/images/NewTrashLocation';
import {useEffect, useState} from 'react';
import axios from 'axios';
import api from 'api/api';
import Toast from 'react-native-toast-message';

export default function NewTrashDetail() {
  const navigation2 = useNavigation<NavigationProp<RootHomeParamList>>();

  const [isClick, setIsClick] = useState<boolean>(false);
  const [changeText, onChangeText] = useState('');

  const handleSubmit = async () => {
    try {
      await api.post('/bin/new', {
        data: {
          address: 'Seoul',
          lat: 27.5,
          log: 33.34345,
          type_no: 1,
          location_type_no: 1,
        },
      });
      console.log('성공');
      navigation2.navigate('Home');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'error!!',
        position: 'top',
        bottomOffset: 100,
        visibilityTime: 2000,
      });
    }
  };

  useEffect(() => {
    if (isClick) {
      setIsClick(true);
      return;
    }
    setIsClick(false);
  }, []);

  return (
    <Background>
      <ScrollView>
        <Icons>
          <CloseSvg width="24px" height="24px" />
        </Icons>
        <Wrapper>
          <HeadLocationWrapper>
            <TextWrapper>
              <NewTrashLocation width="24px" height="24px" />
              <Text>서울 성북구 삼선교로 16길 16-3 1층 101.102호</Text>
            </TextWrapper>
          </HeadLocationWrapper>
          <HeadTitle>
            <HeadTitleText>Tell us more about the bin you found</HeadTitleText>
          </HeadTitle>
          <Body>
            <BodyTitle>Bin type</BodyTitle>
            <ButtonWrapper>
              <Button1 isClick={isClick}>
                <ButtonText isClick={isClick}>Trash</ButtonText>
              </Button1>
              <Button2 isClick={isClick}>
                <ButtonText isClick={isClick}>Recycling</ButtonText>
              </Button2>
            </ButtonWrapper>
            <BodyTitle>Location details</BodyTitle>
            <ButtonWrapper>
              <Button3 isClick={isClick}>
                <ButtonText isClick={isClick}>Subway Entrance</ButtonText>
              </Button3>
              <Button4 isClick={isClick}>
                <ButtonText isClick={isClick}>Bus/Taxi Stop</ButtonText>
              </Button4>
            </ButtonWrapper>
            <ButtonWrapper>
              <Button5 isClick={isClick}>
                <ButtonText isClick={isClick}>Roadside</ButtonText>
              </Button5>
              <Button6 isClick={isClick}>
                <ButtonText isClick={isClick}>Square/Park</ButtonText>
              </Button6>
              <Button1 isClick={isClick}>
                <ButtonText isClick={isClick}>Other</ButtonText>
              </Button1>
            </ButtonWrapper>
            <TextArea
              multiline
              maxLength={200}
              value={changeText}
              placeholder="In front of a store (e.g. Olive Young) or 
          by the bus stop? More details will help fellow wanderers!"
            />
            <AddPicture>
              <AddImage source={require('assets/images/AddImage.png')} style={{alignItems: 'center'}} />
              <AddSub> Upload</AddSub>
              <Addb3> You can upload only one photo!</Addb3>
            </AddPicture>
          </Body>
          <Button onPress={handleSubmit}>
            <ButtonTexts>submit</ButtonTexts>
          </Button>
        </Wrapper>
      </ScrollView>
    </Background>
  );
}

const Wrapper = styled.View`
  width: 100%;
  height: 800px;
  align-items: center;
  background: ${Palette.White};
`;

const Background = styled.View`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  background: ${Palette.White};
  z-index: 1;
  bottom: 0;
`;

const Icons = styled.TouchableOpacity`
  padding-left: 16px;
  padding-top: 20px;
  padding-bottom: 16px;
  align-items: left;
  background: ${Palette.White};
`;

const HeadLocationWrapper = styled.View`
  width: 343px;
  height: 44px;
  padding-top: 12px;
  padding-left: 12px;
  gap: 10px;
  border-radius: 10px;
  background: ${Palette.Gray1};
`;

const HeadTitle = styled.View`
  width: 100%;
  align-items: left;
  padding-top: 12px;
  padding-right: 94px;
  padding-left: 16px;
  padding-bottom: 10px;
`;

const HeadTitleText = styled(DefaultText)`
  font-size: ${Typo.Title1.fontSize};
  font-weight: ${Typo.Title1.fontWeight};
  color: ${Palette.Black};
  line-height: 28.6px;
  letter-spacing: -0.11px;
`;

const Body = styled.View`
  width: 100%;
  align-items: left;
  padding-left: 16px;
`;

const BodyTitle = styled(DefaultText)`
  font-size: ${Typo.SubTitle.fontSize};
  font-weight: ${Typo.SubTitle.fontWeight};
  color: ${Palette.Black};
  line-height: 22.4px;
  letter-spacing: -0.064px;
`;

const TextWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;

const ButtonWrapper = styled.View`
  flex-direction: row;
  padding-top: 6px;
  padding-bottom: 12px;
  row-gap: 10px;
  flex-wrap: wrap;
`;

const Button1 = styled.TouchableOpacity<{isClick: boolean}>`
  width: 69px;
  height: 34px;
  border-radius: 22px;
  background: ${props => (props.isClick ? Palette.Primary : Palette.Gray2)};
  padding-top: 5px;
  margin-left: 10px;
`;

const Button2 = styled.TouchableOpacity<{isClick: boolean}>`
  width: 106px;
  height: 34px;
  border-radius: 22px;
  background: ${props => (props.isClick ? Palette.Primary : Palette.Gray2)};
  padding-top: 5px;
  margin-left: 10px;
`;

const Button3 = styled.TouchableOpacity<{isClick: boolean}>`
  width: 143px;
  height: 34px;
  border-radius: 22px;
  background: ${props => (props.isClick ? Palette.Primary : Palette.Gray2)};
  padding-top: 5px;
  margin-left: 10px;
`;
const Button4 = styled.TouchableOpacity<{isClick: boolean}>`
  width: 119px;
  height: 34px;
  border-radius: 22px;
  background: ${props => (props.isClick ? Palette.Primary : Palette.Gray2)};
  padding-top: 5px;
  margin-left: 10px;
`;
const Button5 = styled.TouchableOpacity<{isClick: boolean}>`
  width: 91px;
  height: 34px;
  border-radius: 22px;
  background: ${props => (props.isClick ? Palette.Primary : Palette.Gray2)};
  padding-top: 5px;
  margin-left: 10px;
`;

const Button6 = styled.TouchableOpacity<{isClick: boolean}>`
  width: 110px;
  height: 34px;
  border-radius: 22px;
  background: ${props => (props.isClick ? Palette.Primary : Palette.Gray2)};
  padding-top: 5px;
  margin-left: 10px;
`;

const TextArea = styled.TextInput`
  width: 343px;
  height: 200px;
  border-radius: 8px;
  background: ${Palette.Gray2};
  text-align: vertical;
  margin-bottom: 15px;
  vertical-align: top;
  /* padding-top: 10px;
  padding-left: 16px;
  padding-right: 16px; */
`;

const AddPicture = styled.View`
  width: 343px;
  height: 134px;
  flex-shrink: 0;
  border-radius: 8px;
  background: ${Palette.P100};
  align-content: center;
`;

const AddImage = styled.Image`
  align-content: center;
  margin-top: 23px;
  margin-left: 152px;
  margin-right: 156px;
`;

const AddSub = styled.Text`
  font-size: ${Typo.SubTitle.fontSize};
  font-weight: ${Typo.SubTitle.fontWeight};
  text-align: center;
`;
const Addb3 = styled(DefaultText)`
  font-size: ${Typo.B3.fontSize};
  font-weight: ${Typo.B3.fontWeight};
  text-align: center;
`;

const ButtonText = styled(DefaultText)<{isClick: boolean}>`
  font-size: ${Typo.Button1.fontSize};
  font-weight: ${Typo.Button1.fontWeight};
  color: ${props => (props.isClick ? Palette.White : Palette.Gray4)};
  text-align: center;
`;
const Button = styled.TouchableOpacity`
  width: 343px;
  padding: 16px 30px;
  border-radius: 10px;
  background: ${Palette.Primary};
  margin-top: auto;
  margin-bottom: 30px;
`;

export const ButtonTexts = styled(DefaultText)`
  font-size: ${Typo.Button1.fontSize};
  font-weight: ${Typo.Button1.fontWeight};
  color: ${Palette.White};
  text-align: center;
`;

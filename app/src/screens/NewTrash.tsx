import {Palette} from 'constants/palette';
import {Image, Text, View} from 'react-native';
import styled from 'styled-components/native';
import NewTrashLocation from 'assets/images/NewTrashLocation';
import DefaultText from 'components/DefaultText';
import {Typo} from 'constants/typo';
import {NavigationProp, useNavigation} from '@react-navigation/native';

export default function NewTrash() {
  const navigation2 = useNavigation<NavigationProp<RootHomeParamList>>();
  return (
    <Background>
      <Wrapper>
        <Header>
          <Indicator />
        </Header>
        <Body>
          <TextWrapper>
            <NewTrashLocation width="24px" height="24px" />
            <Text>서울 성북구 삼선교로 16길 16-3 1층 101.102호</Text>
          </TextWrapper>
          <Button onPress={() => navigation2.navigate('NewTrashDetail')}>
            <ButtonText>There’s a bin here!</ButtonText>
          </Button>
        </Body>
      </Wrapper>
    </Background>
  );
}

const Background = styled.View`
  position: absolute;
  flex: 1;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
  bottom: 0;
`;

const Wrapper = styled.View`
  width: 100%;
  height: 156px;
  border-radius: 20px 20px 0px 0px;
  background: ${Palette.White};
  gap: 6px;
  margin-top: auto;
`;

const Header = styled.View`
  border-radius: 20px 20px 0px 0px;
  padding: 8px 0px 18px;
  align-items: center;
  background: ${Palette.White};
`;

const Indicator = styled.View`
  border-radius: 2px;
  width: 45px;
  height: 4px;
  background: ${Palette.Gray2};
`;

const Body = styled.View`
  padding: 0px 24px 0px 24px;
  flex: 1;
  background: ${Palette.White};
`;

const TextWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;

const Button = styled.TouchableOpacity`
  width: 100%;
  padding: 16px 30px;
  border-radius: 10px;
  background: ${Palette.Primary};
  margin-top: auto;
  margin-bottom: 30px;
`;

export const ButtonText = styled(DefaultText)`
  font-size: ${Typo.Button1.fontSize};
  font-weight: ${Typo.Button1.fontWeight};
  color: ${Palette.White};
  text-align: center;
`;

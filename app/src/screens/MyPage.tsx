import {Text, View, SectionList} from 'react-native';
import styled from 'styled-components/native';
import {Palette} from 'constants/palette';
import ArrowNextSvg from 'assets/images/ArrowNextSvg';

export default function MyPage() {
  return (
    <MyWrapper>
      <MyImage source={require('assets/images/Ticket.png')} style={{alignItems: 'center'}} />

      <TextWrapper>
        <FeedbackWrapper>
          <TextWrapper>
            <Texts>
              <Text>See my feedback</Text>
            </Texts>
            <ArrowNextSvg width="24px" height="24px" fill="#66B7FF" />
          </TextWrapper>
        </FeedbackWrapper>
      </TextWrapper>
    </MyWrapper>
  );
}

const MyWrapper = styled.View`
  width: 100%;
  height: 800px;
  align-items: center;
  background: ${Palette.White};
  display: flex;
`;

const MyImage = styled.Image`
  align-content: center;
  margin-top: 22px;
  margin-left: 16px;
  margin-right: 16px;
  margin-bottom: 22px;
`;

const TextWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;

const Texts = styled.View`
  padding-right: 175px;
`;

const FeedbackWrapper = styled.TouchableOpacity`
  width: 342px;
  height: 48px;
  padding: 12px 12px 12px 16px;
  gap: 10px;
  border-radius: 12px;
  border: 1px solid ${Palette.P100};
  background: ${Palette.P100};
`;

const SettingWrapper = styled.SectionList``;

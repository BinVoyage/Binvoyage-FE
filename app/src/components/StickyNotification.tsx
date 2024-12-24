import CloseSvg from 'assets/images/CloseSvg';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import DefaultText from './DefaultText';
import { Typo } from 'constants/typo';
import { Palette } from 'constants/palette';
import { useState } from 'react';

const width = Dimensions.get('window').width;

const Container = styled.View<{active: boolean}>`
  display: ${props => props.active ? 'flex' : 'none'};
  position: absolute;
  top: 52px;
  left: 16px;
  width: ${width - 32};
  padding: 14px 12px 14px 14px;
  z-index: 999;
  background: rgba(45, 61, 92, 0.90);
  border-radius: 10px;
`;

const TextNotification = styled(DefaultText)`
  font-size: ${Typo.B3.fontSize};
  font-weight: ${Typo.B3.fontWeight};
  color: ${Palette.Gray1};
`

const BtnClose = styled.TouchableOpacity`
  position: absolute;
  top: 14px;
  right: 12px;
  width: 12px;
  height: 12px;
  z-index: 10;
`;

export default function StickyNotification({content}: {content: string}) {
const [notification, setNotification] = useState<boolean>(true);
  return (
    <Container active={notification}>
      <BtnClose onPress={() => setNotification(false)}>
        <CloseSvg width='12' height='12' />
      </BtnClose>
      <TextNotification>{content}</TextNotification>
    </Container>
  );
}

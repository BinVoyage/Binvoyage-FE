import DefaultText from 'components/DefaultText';
import {Palette} from 'constants/palette';
import {Typo} from 'constants/typo';
import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

const {width, height} = Dimensions.get('window');

export const Background = styled.TouchableOpacity`
  position: absolute;
  width: 100%;
  height: 100%;
  flex: 1;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.View`
  width: ${width - 90}px;
  background: ${Palette.White};
  padding: 16px 16px 36px;
  align-items: center;
  gap: 20px;
  border-radius: 10px;
`;

export const Title = styled(DefaultText)`
  font-size: ${Typo.SubTitle.fontSize};
  font-weight: ${Typo.SubTitle.fontWeight};
  color: ${Palette.Black};
`;

export const RowWrapper = styled.View`
  flex-direction: row;
  gap: 26px;
  align-items: center;
`;

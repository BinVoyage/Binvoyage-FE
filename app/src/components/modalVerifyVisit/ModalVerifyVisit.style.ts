import DefaultText from 'components/DefaultText';
import {Palette} from 'constants/palette';
import {Typo} from 'constants/typo';
import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

const {width, height} = Dimensions.get('window');

export const Background = styled.View`
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
  width: ${width - 48}px;
  background: ${Palette.White};
  padding: 30px 16px 18px;
  align-items: center;
  border-radius: 10px;
`;

export const Title = styled(DefaultText)`
  font-size: ${Typo.Title2.fontSize};
  font-weight: ${Typo.Title2.fontWeight};
  color: ${Palette.Black};
`;

export const TextAddress = styled(DefaultText)`
  font-size: ${Typo.B1.fontSize};
  font-weight: ${Typo.B1.fontWeight};
  color: ${Palette.Gray6};
  margin: 4px 0px 16px;
`;

export const ReviewInput = styled.TextInput`
  width: 100%;
  height: 150px;
  border-radius: 8px;
  padding: 12px 14px;
  background: ${Palette.Gray1};
  font-size: ${Typo.B3.fontSize};
  font-weight: ${Typo.B3.fontWeight};
  color: ${Palette.Black};
  margin-bottom: 20px;
`;

export const TextB1 = styled(DefaultText)`
  font-size: ${Typo.B1.fontSize};
  font-weight: ${Typo.B1.fontWeight};
  color: ${Palette.Gray5};
  margin: 15px 0px 12px;
`;

export const Button = styled.TouchableOpacity<{isPrimary?: boolean}>`
  width: 100%;
  padding: 14px 30px;
  border-radius: 8px;
  background: ${props => (props.isPrimary ? Palette.Primary : Palette.Gray3)};
  color: ${props => (props.isPrimary ? Palette.White : Palette.Gray5)};
`;

export const ButtonText = styled(DefaultText)<{isPrimary?: boolean}>`
  font-size: ${Typo.Button1.fontSize};
  font-weight: ${Typo.Button1.fontWeight};
  color: ${props => (props.isPrimary ? Palette.White : Palette.Gray5)};
  text-align: center;
`;

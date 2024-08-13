import DefaultText from 'components/DefaultText';
import {Palette} from 'constants/palette';
import {Typo} from 'constants/typo';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const widthRatio = 244 / 375;
const heightRatio = 530 / 812;

export const Container = styled.View`
  position: relative;
  flex: 1;
`;

export const Background = styled.View`
  position: relative;
  background: ${Palette.Gray2};
  flex: 1;
`;

export const BgImg = styled.ImageBackground`
  position: absolute;
  width: ${Math.round(screenWidth * widthRatio)};
  height: ${Math.round(screenHeight * heightRatio)};
  bottom: 180px;
  align-self: center;
`

export const Modal = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 225px;
  padding: 17px 38px 38px;
  align-items: center;
  background: ${Palette.White};
`;

export const Pagination = styled.View`
  flex-direction: row;
  gap: 6px;
  margin-bottom: 15px;
`;

export const CurrentDot = styled.View`
  width: 28px;
  height: 6px;
  flex-shrink: 0;
  border-radius: 4px;
  background: ${Palette.Primary};
`;

export const Dot = styled.View`
  width: 6px;
  height: 6px;
  border-radius: 4px;
  flex-shrink: 0;
  background: ${Palette.Gray3};
`;

export const Text = styled(DefaultText)`
  font-size: ${Typo.Title1.fontSize};
  font-weight: ${Typo.Title1.fontWeight};
  color: ${Palette.Black};
  text-align: center;
`;

export const Button = styled.TouchableOpacity<{type: string}>`
  width: 100%;
  padding: 16px 30px;
  justify-content: center;
  align-items: center;
  background: ${props => (props.type === 'next' ? Palette.P100 : Palette.Primary)};
  border-radius: 10px;
  margin-top: auto;
`;

export const ButtonText = styled(DefaultText)<{type: string}>`
  font-size: ${Typo.Button1.fontSize};
  font-weight: ${Typo.Button1.fontWeight};
  color: ${props => (props.type === 'next' ? Palette.Primary : Palette.White)};
`;

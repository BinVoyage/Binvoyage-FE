import {Palette} from 'constants/palette';
import {Typo} from 'constants/typo';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Background = styled.View`
  background: ${Palette.Gray2};
  flex: 1;
`;

export const Modal = styled.View`
  width: 100%;
  height: 225px;
  padding: 17px 38px 38px;
  align-items: center;
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

export const Text = styled.Text`
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

export const ButtonText = styled.Text<{type: string}>`
  font-size: ${Typo.Button1.fontSize};
  font-weight: ${Typo.Button1.fontWeight};
  color: ${props => (props.type === 'next' ? Palette.Primary : Palette.White)};
`;

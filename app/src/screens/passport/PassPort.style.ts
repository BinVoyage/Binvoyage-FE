import {Palette} from 'constants/palette';
import {Typo} from 'constants/typo';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: ${Palette.White};
  padding: 12px 16px 52px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
`;

export const ArrowPrevWrapper = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: centerd;
`;

export const Title = styled.Text`
  font-size: ${Typo.Title2.fontSize};
  font-weight: ${Typo.Title2.fontWeight};
  color: ${Palette.Black};
`;

export const Pagination = styled.View`
  position: absolute;
  bottom: -20px;
  flex-direction: row;
  gap: 6px;
  align-self: center;
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

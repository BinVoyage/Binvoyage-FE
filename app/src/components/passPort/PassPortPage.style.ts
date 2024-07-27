import {Palette} from 'constants/palette';
import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const Container = styled.View`
  position: relative;
  flex: 1;
  background: ${Palette.Secondary};
  border-radius: 12px;
  /* flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap; */
`;

export const StampWrapper = styled.ImageBackground<{top: number; left: number; zIndex: number}>`
  position: absolute;
  width: ${(width - 32) / 2}px;
  height: ${(height - 190) / 3}px;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  z-index: ${props => props.zIndex};
`;

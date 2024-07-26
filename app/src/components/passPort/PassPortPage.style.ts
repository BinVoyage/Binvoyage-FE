import {Palette} from 'constants/palette';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background: ${Palette.Secondary};
  border-radius: 12px;
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
`;

export const StampWrapper = styled.ImageBackground`
  flex: 0 0 ${(width - 92) / 2}px;
  height: ${(height - 270) / 3}px;
  border: 1px solid red;
`

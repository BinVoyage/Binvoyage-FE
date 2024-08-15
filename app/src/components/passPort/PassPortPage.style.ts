import {Palette} from 'constants/palette';
import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const width = Math.floor((screenWidth - 48) / 2);
const height = (width * 120) / 130;

export const Container = styled.ScrollView`
  position: relative;
  flex: 1;
  background: ${Palette.Secondary};
  border-radius: 12px;
`;

export const Inner = styled.View`
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  flex: 1;
  padding: 16px 0px 16px;
`;

export const StampWrapper = styled.ImageBackground<{top: number}>`
  position: relative;
  width: ${width}px;
  height: ${height}px;
  padding-top: 20px;
  margin-top: ${props => props.top}px;
`;

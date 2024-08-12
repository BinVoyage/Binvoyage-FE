import DefaultText from 'components/DefaultText';
import {Palette} from 'constants/palette';
import {Typo} from 'constants/typo';
import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

const width = Dimensions.get('window').width;

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 20px;
  width: ${width - 32}px;
  flex: 1;
  padding: 16px 25px;
  background: ${Palette.Gray1};
  border-radius: 10px;
`;

export const ImageWrapper = styled.ImageBackground`
  aspect-ratio: 1;
  height: 100%;
`;

export const TextEmpty = styled(DefaultText)`
  font-size: ${Typo.B2.fontSize};
  font-weight: ${Typo.B2.fontWeight};
  color: ${Palette.Black};
`;

import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import {Palette} from 'constants/palette';
import DefaultText from 'components/DefaultText';
import {Typo} from 'constants/typo';

const {width, height} = Dimensions.get('window');

export const Container = styled.TouchableOpacity`
  width: ${Math.round((width / 375) * 232)}px;
  flex: 1;
  padding: 8px 12px;
  background: ${Palette.Gray1};
  border-radius: 10px;
  border-width: 1px;
  border-color: ${Palette.Gray3};
`;

export const TextAddress = styled(DefaultText)`
  /* height: ${Math.round((height / 812) * 30)}px; */
  font-size: ${Typo.Label.fontSize};
  font-weight: ${Typo.Label.fontWeight};
  color: ${Palette.Gray4};
`;

export const TextType = styled(DefaultText)`
  font-size: ${Typo.B4.fontSize};
  font-weight: ${Typo.B4.fontWeight};
  color: ${Palette.Gray5};
  margin: 9px 0px 2px;
`;

export const TextDistance = styled(DefaultText)`
  font-size: ${Typo.B2.fontSize};
  font-weight: ${Typo.B2.fontWeight};
  color: ${Palette.Black};
  margin-bottom: 6px;
`;

export const VisitWrapper = styled.View`
  background: ${Palette.Secondary};
  padding: 6px 10px;
  border-radius: 5px;
  margin-top: auto;
`;

export const TextVisit = styled(DefaultText)`
  font-size: ${Typo.Label.fontSize};
  font-weight: ${Typo.Label.fontWeight};
  color: ${Palette.White};
  text-align: center;
`;

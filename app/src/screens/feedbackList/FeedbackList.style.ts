import DefaultText from 'components/DefaultText';
import {Palette} from 'constants/palette';
import {Typo} from 'constants/typo';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: ${Palette.White};
  padding: 10px 16px;
`;

export const ArrowPrevWrapper = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
`;

export const DetailTitle = styled(DefaultText)`
  font-size: ${Typo.SubTitle.fontSize};
  font-weight: ${Typo.SubTitle.fontWeight};
  color: ${Palette.Black};
  margin: 18px 0px;
`;

export const BtnScrollUp = styled.ImageBackground`
  position: absolute;
  right: 16px;
  bottom: 30px;
  width: 60px;
  height: 60px;
`;

import {Palette} from 'constants/palette';
import {Typo} from 'constants/typo';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: ${Palette.Primary};
  padding: 18px 16px 0px;
`;

export const HeaderTitle = styled.Text`
  font-size: ${Typo.Title2.fontSize};
  font-weight: ${Typo.Title2.fontWeight};
  color: ${Palette.White};
`;

export const Bridge = styled.TouchableOpacity`
  flex-direction: row;
  height: 92px;
  margin: 12px 0px 26px;
`;

export const BridgeIconWrapper = styled.ImageBackground`
  width: 93px;
  height: 92px;
  align-items: center;
  justify-content: center;
`;

export const BridgeTextWrapper = styled.View`
  flex: 1;
  height: 92px;
  justify-content: center;
  padding-left: 12px;
  background: ${Palette.White};
`;

export const BridgeText = styled.Text`
  font-size: ${Typo.Button1.fontSize};
  font-weight: ${Typo.Button1.fontWeight};
  color: ${Palette.Black};
`;

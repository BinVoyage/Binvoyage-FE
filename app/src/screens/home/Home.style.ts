import {Palette} from 'constants/palette';
import {Typo} from 'constants/typo';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: ${Palette.Primary};
  padding-top: 18px;
`;

export const HeaderTitle = styled.Text`
  font-size: ${Typo.Title2.fontSize};
  font-weight: ${Typo.Title2.fontWeight};
  color: ${Palette.White};
  padding: 0px 16px;
`;

export const Bridge = styled.TouchableOpacity`
  flex-direction: row;
  height: 92px;
  margin: 12px 16px 26px;
`;

export const BridgeIconWrapper = styled.ImageBackground`
  width: 93px;
  height: 92px;
  align-items: center;
  justify-content: center;
`;

export const BridgeTextWrapper = styled.ImageBackground`
  flex: 1;
  height: 92px;
  justify-content: center;
  padding-left: 12px;
`;

export const BridgeText = styled.Text`
  font-size: ${Typo.Button1.fontSize};
  font-weight: ${Typo.Button1.fontWeight};
  color: ${Palette.Black};
`;

export const Body = styled.View`
  flex: 1;
  border-radius: 12px 12px 0px 0px;
  background: ${Palette.Gray1};
  padding: 22px 20px 31px;
`;

export const BodyTitle = styled.Text`
  font-size: ${Typo.Title1.fontSize};
  font-weight: ${Typo.Title1.fontWeight};
  color: ${Palette.Black};
`;

export const BodyDescription = styled.Text`
  font-size: ${Typo.B1.fontSize};
  font-weight: ${Typo.B1.fontWeight};
  color: ${Palette.Gray6};
  margin: 6px 0px 22px;
`;

export const PassPortBg = styled.View`
  position: relative;
  height: 363px;
  background: ${Palette.White};
  border-radius: 0px 18px 18px 0px;
`

export const PassPort = styled.View`
  width: 83%;
  height: 363px;
  background: ${Palette.Secondary};
  border-radius: 0px 18px 18px 0px;
`
export const ArrowNextWrapper = styled.TouchableOpacity`
  position: absolute;
  width: 24px;
  height: 24px;
  top: 50%;
  right: 13px;
  margin-top: -12px;
`

export const Button = styled.TouchableOpacity`
  width: 100%;
  padding: 16px 30px;
  justify-content: center;
  align-items: center;
  background: ${Palette.Primary};
  border-radius: 10px;
  margin-top: auto;
`;

export const ButtonText = styled.Text`
  font-size: ${Typo.Button1.fontSize};
  font-weight: ${Typo.Button1.fontWeight};
  color: ${Palette.White};
`;
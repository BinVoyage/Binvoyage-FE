import DefaultText from 'components/DefaultText';
import {Palette} from 'constants/palette';
import {Typo} from 'constants/typo';
import useResponsiveFontSize from 'hooks/useResponsiveFontSize';
import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

const {width, height} = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background: ${Palette.Primary};
  padding-top: 18px;
`;

export const HeaderTitle = styled(DefaultText)`
  font-size: ${Typo.Title2.fontSize};
  font-weight: ${Typo.Title2.fontWeight};
  color: ${Palette.White};
  padding: 0px 16px;
`;

export const Bridge = styled.TouchableOpacity`
  flex-direction: row;
  margin: 12px 16px 26px;
  justify-content: center;
`;

export const BridgeIconWrapper = styled.ImageBackground`
  width: ${(height - 200) / 7}px;
  height: ${(height - 200) / 7}px;
  justify-content: center;
  align-items: center;
  /* width: ${(width / 375) * 93}px;
  height: ${(height / 812) * 92}px; */
`;

export const BridgeIcon = styled.ImageBackground`
  position: relative;
  left: 5%;
  width: ${((height - 200) / 7) * 0.8}px;
  height: ${((height - 200) / 7) * 0.8}px;
  /* width: ${(width / 375) * 92}px;
  height: ${(height / 812) * 92}px; */
`;

export const BridgeTextWrapper = styled.ImageBackground`
  flex: 1;
  height: ${(height - 200) / 7}px;
  /* height: ${(height / 812) * 92}px; */
  justify-content: center;
  padding-left: 12px;
`;

export const BridgeText = styled(DefaultText)`
  font-size: ${useResponsiveFontSize(Typo.Button1.fontSize)};
  font-weight: ${Typo.Button1.fontWeight};
  color: ${Palette.Black};
`;

export const Body = styled.View`
  flex: 1;
  border-radius: 12px 12px 0px 0px;
  background: ${Palette.Gray1};
  padding: 22px 20px 24px;
`;

export const BodyTitle = styled(DefaultText)`
  font-size: ${Typo.Title1.fontSize};
  font-weight: ${Typo.Title1.fontWeight};
  color: ${Palette.Black};
`;

export const BodyDescription = styled(DefaultText)`
  font-size: ${Typo.B1.fontSize};
  font-weight: ${Typo.B1.fontWeight};
  color: ${Palette.Gray6};
  margin: 6px 0px 22px;
`;

export const PassPortBg = styled.View`
  position: relative;
  width: ${((height - 200) / 2.2) * 0.78 + 50}px;
  height: ${(height - 200) / 2.2}px;
  background: ${Palette.White};
  border-radius: 0px 18px 18px 0px;
  align-self: center;
`;

export const PassPort = styled.View`
  width: ${((height - 200) / 2.2) * 0.78}px;
  height: ${(height - 200) / 2.2}px;
  background: ${Palette.Secondary};
  border-radius: 0px 18px 18px 0px;
  padding: ${(height / 812) * 24}px ${(height / 812) * 10}px;
  align-items: center;
`;

export const PassPortTitle = styled(DefaultText)`
  font-family: 'PTSerif-Bold';
  font-size: ${useResponsiveFontSize(32)}px;
  font-weight: 700;
  color: ${Palette.White};
  text-align: center;
`;

export const ImagePassPort = styled.ImageBackground`
  width: 100%;
  height: ${((height - 200) / 2.2) * 0.33}px;
  margin-top: ${(height / 812) * 20}px;
  margin-bottom: ${(height / 812) * 12}px;
`;

export const PassPortSubTitle = styled(DefaultText)`
  font-family: 'PTSerif-Italic';
  font-size: ${useResponsiveFontSize(16)}px;
  font-weight: 700;
  color: ${Palette.White};
  text-align: center;
  margin-bottom: ${(height / 812) * 10}px;
`;

export const IconPassPort = styled.ImageBackground`
  width: ${(width / 375) * 34}px;
  height: ${(height / 812) * 19}px;
`;

export const ArrowNextWrapper = styled.TouchableOpacity`
  position: absolute;
  width: 24px;
  height: 24px;
  top: 50%;
  right: 8px;
  margin-top: -12px;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  padding: 16px 30px;
  justify-content: center;
  align-items: center;
  background: ${Palette.Primary};
  border-radius: 10px;
  margin-top: auto;
`;

export const ButtonText = styled(DefaultText)`
  font-size: ${Typo.Button1.fontSize};
  font-weight: ${Typo.Button1.fontWeight};
  color: ${Palette.White};
`;

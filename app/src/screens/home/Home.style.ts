import DefaultText from 'components/DefaultText';
import {Palette} from 'constants/palette';
import {Typo} from 'constants/typo';
import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

const screenWidth = Dimensions.get('window').width;
const width = screenWidth - 40;
const widthPassport = (width * 284) / 343;
const heightPassport = (widthPassport * 363) / 264;

// 기준 너비 (디자인 시안의 너비)
const guidelineBaseWidth = 375;

// 너비 비율에 따른 폰트 크기 조정
const scale = (size: number) => (screenWidth / guidelineBaseWidth) * size;

export const Container = styled.View`
  flex: 1;
  background: ${Palette.Gray1};
`;

export const Inner = styled.ScrollView`
  flex: 1;
`;

export const TopWrapper = styled.View`
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
  width: 93px;
  height: 92px;
  justify-content: center;
  align-items: center;
`;

export const BridgeIcon = styled.ImageBackground`
  width: 40px;
  height: 66px;
`;

export const BridgeTextWrapper = styled.ImageBackground`
  flex: 1;
  height: 92px;
  justify-content: center;
  padding-left: 12px;
`;

export const BridgeText = styled(DefaultText)`
  font-size: ${Typo.Button1.fontSize};
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
  width: ${width};
  height: ${Math.round(heightPassport)};
  background: ${Palette.White};
  border-radius: 0px 18px 18px 0px;
  align-self: center;
`;

export const PassPort = styled.View`
  width: ${Math.round(widthPassport)};
  height: ${Math.round(heightPassport)};
  background: ${Palette.Secondary};
  border-radius: 0px 18px 18px 0px;
  align-items: center;
  padding: 32px 13px;
`;

export const PassPortTitle = styled(DefaultText)`
  font-family: 'PTSerif-Bold';
  font-size: ${scale(32)}px;
  font-weight: 700;
  color: ${Palette.White};
  text-align: center;
`;

export const ImagePassPort = styled.ImageBackground`
  width: ${Math.round(widthPassport - 26)}px;
  height: ${Math.round(((widthPassport - 26) * 120) / 258)};
  margin: 24px 0px 14px;
`;

export const PassPortSubTitle = styled(DefaultText)`
  font-family: 'PTSerif-Italic';
  font-size: ${scale(18)}px;
  font-weight: 700;
  color: ${Palette.White};
  text-align: center;
  margin-bottom: 30px;
`;

export const IconPassPort = styled.ImageBackground`
  width: ${Math.round(((widthPassport - 26) * 34) / 284)}px;
  height: ${Math.round(((widthPassport - 26) * 19) / 284)};
`;

export const ArrowNextWrapper = styled.TouchableOpacity`
  position: absolute;
  width: 24px;
  height: 24px;
  top: 50%;
  right: ${(13 * width) / 343};
  margin-top: -12px;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  padding: 16px 30px;
  justify-content: center;
  align-items: center;
  background: ${Palette.Primary};
  border-radius: 10px;
  margin-top: 24px;
`;

export const ButtonText = styled(DefaultText)`
  font-size: ${Typo.Button1.fontSize};
  font-weight: ${Typo.Button1.fontWeight};
  color: ${Palette.White};
`;

import DefaultText from "components/DefaultText";
import { Palette } from "constants/palette";
import { Typo } from "constants/typo";
import { Dimensions } from "react-native";
import styled from "styled-components/native";

const screenWidth = Dimensions.get('window').width;
const width = screenWidth - 32;

export const TopLabel = styled.View`
  border-radius: 100px;
  background: ${Palette.P100};
  padding: 4px 14px;
  align-self: flex-start;
`;

export const ArrowUpWrapper = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
`;

export const TopLabelText = styled(DefaultText)`
  color: ${Palette.Primary};
  font-size: ${Typo.Label.fontSize};
  font-weight: ${Typo.Label.fontWeight};
`;

export const Title = styled(DefaultText)`
  font-size: ${Typo.Title2.fontSize};
  font-weight: ${Typo.Title2.fontWeight};
  color: ${Palette.Black};
  margin: 6px 0px 14px;
`;

export const RowWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TextInfo1 = styled(DefaultText)`
  font-size: ${Typo.B1.fontSize};
  font-weight: ${Typo.B1.fontWeight};
  color: ${Palette.Gray6};
  margin-left: 2px;
`;

export const Division = styled.View`
  width: 1px;
  height: 16px;
  background: ${Palette.Gray4};
  margin: 0px 8px;
`;

export const TextWrongInfo = styled(DefaultText)`
  font-size: ${Typo.B1.fontSize};
  font-weight: ${Typo.B1.fontWeight};
  color: ${Palette.Primary};
`;

export const ImageArea = styled.ImageBackground`
  width: ${width}px;
  height: ${(width * 186) / 343}px;
  border: 1px solid red;
  border-radius: 10px;
  margin: 18px 0px;
`;
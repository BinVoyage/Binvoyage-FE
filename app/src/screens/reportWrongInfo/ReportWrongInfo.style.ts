import DefaultText from "components/DefaultText";
import { Palette } from "constants/palette";
import { Typo } from "constants/typo";
import { Dimensions } from "react-native";
import styled from "styled-components/native";

const screenWidth = Dimensions.get('window').width;
const width = screenWidth - 32;

export const Container = styled.View`
  flex: 1;
  background: ${Palette.Gray2};
  padding: 10px 16px 38px;
`;

export const ArrowPrevWrapper = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`;

export const RowWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const TextInfoB1 = styled(DefaultText)`
  font-size: ${Typo.B1.fontSize};
  font-weight: ${Typo.B1.fontWeight};
  color: ${Palette.Gray6};
`;

export const TextInfoB3 = styled(DefaultText)`
  font-size: ${Typo.B1.fontSize};
  font-weight: ${Typo.B1.fontWeight};
  color: ${Palette.Gray6};
`;

export const Title = styled(DefaultText)`
  font-size: ${Typo.Title2.fontSize};
  font-weight: ${Typo.Title2.fontWeight};
  color: ${Palette.Black};
  text-align: center;
`;

export const AddressWrapper = styled.View`
  padding: 8px 14px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background: ${Palette.White};
  margin-top: 14px;
  align-self: center;
`

export const ImageArea = styled.ImageBackground`
  width: ${width}px;
  height: ${(width * 186) / 343}px;
  border: 1px solid red;
  border-radius: 10px;
  margin: 18px 0px;
`;

export const DetailWrapper = styled.View`
  border-radius: 10px;
  background: ${Palette.White};
  padding: 14px 16px;
`;

export const TextLocationPrimary = styled(DefaultText)`
  font-size: ${Typo.B4.fontSize};
  font-weight: ${Typo.B4.fontWeight};
  color: ${Palette.P400};
  margin-right: 5px;
`;
export const LabelLocation = styled.View`
  border-radius: 100px;
  background: ${Palette.Gray2};
  padding: 2px 10px;
`;

export const LabelLocationText = styled(DefaultText)`
  font-size: ${Typo.Label.fontSize};
  font-weight: ${Typo.Label.fontWeight};
  color: ${Palette.Gray5};
`;

export const TextLocationContents = styled(DefaultText)`
  font-size: ${Typo.B1.fontSize};
  font-weight: ${Typo.B1.fontWeight};
  color: ${Palette.Black};
  margin-top: 2px;
`;

import DefaultText from "components/DefaultText";
import { Palette } from "constants/palette";
import { Typo } from "constants/typo";
import styled from "styled-components/native";

export const Header = styled.View`
  background: ${Palette.White};
  padding: 10px;
`;

export const ArrowPrevWrapper = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
`;

export const AddressWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const TextAddress = styled(DefaultText)`
  font-size: ${Typo.B2.fontSize};
  font-weight: ${Typo.B2.fontWeight};
  color: ${Palette.Gray6};
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  padding: 16px 30px;
  justify-content: center;
  align-items: center;
  background: ${Palette.Primary};
  border-radius: 10px;
  margin-bottom: 20px;
`;

export const ButtonText = styled(DefaultText)`
  font-size: ${Typo.Button1.fontSize};
  font-weight: ${Typo.Button1.fontWeight};
  color: ${Palette.White};
`;
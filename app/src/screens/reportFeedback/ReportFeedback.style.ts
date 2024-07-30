import { Palette } from "constants/palette";
import styled from "styled-components/native";

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
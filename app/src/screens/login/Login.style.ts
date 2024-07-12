import { Palette } from "constants/palette";
import { Typo } from "constants/typo";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 0px 24px;
  background: ${Palette.P100};
`;

export const Title = styled.Text`
  font-size: ${Typo.Title1.fontSize};
  font-weight: ${Typo.Title1.fontWeight};
  color: ${Palette.Black};
`;
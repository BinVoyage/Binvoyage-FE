import { Palette } from "constants/palette";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background: ${Palette.White};
  padding: 12px 16px 36px;
`

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`
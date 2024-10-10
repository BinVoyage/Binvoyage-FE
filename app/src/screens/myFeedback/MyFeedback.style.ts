import styled from "styled-components/native";
import { Typo } from "constants/typo";
import { Palette } from "constants/palette";

export const Wrapper = styled.View`
  width: 100%;
  flex: 1;
  background: ${Palette.White};
  padding: 13px 16px;
`;

export const ArrowPrevWrapper = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  margin-bottom: 16px;
`;

export const ItemWrapper = styled.View`
  width: 100%;
  margin-bottom: 12px;
  border-bottom: 1px solid;
`;

export const RowWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const BinText = styled.Text`
  align-content: space-between;
  font-size: ${Typo.B3.fontSize};
  font-weight: ${Typo.B3.fontWeight};
  color: ${Palette.Gray5};
  margin-left: 4px;
`;

export const Division = styled.View`
  width: 1px;
  height: 16px;
  background: ${Palette.Gray4};
  margin: 0px 8px;
`;

export const DeletedSvgWrapper = styled.TouchableOpacity`
  width: 15px;
  height: 17px;
`;

export const AddressText = styled.Text`
  font-size: ${Typo.Title2.fontSize};
  font-weight: ${Typo.Title2.fontWeight};
  color: ${Palette.Black};
  margin-bottom: 8px;
`;

export const ContentText = styled.Text`
  font-size: ${Typo.B3.fontSize};
  font-weight: ${Typo.B3.fontWeight};
  color: ${Palette.Gray6};
  margin-bottom: 8px;
`;

export const Line = styled.View`
  width: 200%;
  height: 1px;
  align-self: stretch;
  background-color: #e4e6ea;
`;
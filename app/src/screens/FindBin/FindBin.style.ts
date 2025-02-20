import DefaultText from 'components/DefaultText';
import {Palette} from 'constants/palette';
import {Typo} from 'constants/typo';
import styled from 'styled-components/native';

export const ItemWrapper = styled.View`
  position: absolute;
  width: 100%;
  top: 20px;
  left: 0;
  padding: 0px 16px;
  gap: 10px;
`;

export const LocationWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 3px;
  padding: 10px 12px;
  background: ${Palette.White};
  border-radius: 10px;
  shadow-color: rgba(0, 0, 0, 0.2);
  shadow-offset: 0px 2px;
  shadow-opacity: 1;
  shadow-radius: 6px;
  elevation: 3;
`;

export const LocationText = styled(DefaultText)`
  font-size: ${Typo.B3.fontSize};
  font-weight: ${Typo.B3.fontWeight};
  color: #3b3f4a;
  flex-shrink: 1;
  flex-wrap: wrap;
`;

export const RowWrapper = styled.View`
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

export const FilterWrapperNoIcon = styled.TouchableOpacity<{isSelected: boolean; isTrash: boolean}>`
  padding: 6px 10px;
  background: ${props => (props.isSelected ? (props.isTrash ? Palette.Secondary2 : Palette.Primary) : Palette.White)};
  border-radius: 22px;
  gap: 4px;
  shadow-color: rgba(0, 0, 0, 0.2);
  shadow-offset: 0px 2px;
  shadow-opacity: 1;
  shadow-radius: 6px;
  elevation: 3;
`;

export const FilterWrapper = styled.TouchableOpacity<{isSelected: boolean; isTrash: boolean}>`
  padding: 2px 10px 2px 2px;
  background: ${props => (props.isSelected ? (props.isTrash ? Palette.Secondary2 : Palette.Primary) : Palette.White)};
  border-radius: 22px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  shadow-color: rgba(0, 0, 0, 0.2);
  shadow-offset: 0px 2px;
  shadow-opacity: 1;
  shadow-radius: 6px;
  elevation: 3;
`;

export const FilterText = styled(DefaultText)<{isSelected: boolean}>`
  font-size: ${Typo.B3.fontSize};
  font-weight: ${Typo.B3.fontWeight};
  color: ${props => (props.isSelected ? Palette.White : Palette.Gray5)};
`;

export const BtnSearchThisArea = styled.TouchableOpacity`
  padding: 8px 16px;
  border-radius: 22px;
  background: ${Palette.Secondary};
  shadow-color: rgba(0, 0, 0, 0.2);
  shadow-offset: 0px 2px;
  shadow-opacity: 1;
  shadow-radius: 6px;
`;

export const TextSearchThisArea = styled(DefaultText)`
  font-size: ${Typo.Label.fontSize};
  font-weight: ${Typo.Label.fontWeight};
  color: ${Palette.White};
`;

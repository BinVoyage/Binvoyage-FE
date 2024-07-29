import DefaultText from 'components/DefaultText';
import {Palette} from 'constants/palette';
import {Typo} from 'constants/typo';
import styled from 'styled-components/native';

export const Container = styled.View<{isLast?: boolean}>`
  padding-bottom: ${props => (props.isLast ? '0px' : '10px')};
  border-bottom-width: ${props => (props.isLast ? '0px' : '1px')};
  border-bottom-color: ${Palette.Gray2};
  margin-bottom: ${props => (props.isLast ? '0px' : '10px')};
`;

export const RowWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TextDate = styled(DefaultText)`
  font-size: ${Typo.B3.fontSize};
  font-weight: ${Typo.B3.fontWeight};
  color: ${Palette.Gray4};
  margin-right: 8px;
`;

export const TextAuthor = styled(DefaultText)`
  font-size: ${Typo.B2.fontSize};
  font-weight: ${Typo.B2.fontWeight};
  color: ${Palette.Black};
  margin-bottom: 6px;
`;

export const TextContent = styled(DefaultText)`
  font-size: ${Typo.B3.fontSize};
  font-weight: ${Typo.B3.fontWeight};
  color: ${Palette.Gray6};
`;

import DefaultText from 'components/DefaultText';
import {Palette} from 'constants/palette';
import {Typo} from 'constants/typo';
import styled from 'styled-components/native';

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
`;

export const Title = styled(DefaultText)`
  font-size: ${Typo.Title2.fontSize};
  font-weight: ${Typo.Title2.fontWeight};
  color: ${Palette.Black};
  text-align: center;
  margin: 28px 0px 14px;
`;

export const DetailWrapper = styled.View`
  border-radius: 10px;
  background: ${Palette.White};
  padding: 14px 16px;
`;

export const RowWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TextLabel = styled(DefaultText)`
  font-size: ${Typo.Label.fontSize};
  font-weight: ${Typo.Label.fontWeight};
  color: ${Palette.Gray4};
`;

export const TextContent = styled(DefaultText)`
  font-size: ${Typo.B1.fontSize};
  font-weight: ${Typo.B1.fontWeight};
  color: ${Palette.Black};
`;

export const SelectWrapper = styled.View<{isLast: boolean}>`
  flex-direction: row;
  gap: 6px;
  align-items: center;
  padding-bottom: ${props => (props.isLast ? '0px' : '12px')};
  border-bottom-width: ${props => (props.isLast ? '0px' : '1px')};
  border-bottom-color: ${Palette.Gray2};
  margin-bottom: ${props => (props.isLast ? '0px' : '12px')};
`;

export const TextReportType = styled(DefaultText)`
  font-size: ${Typo.B3.fontSize};
  font-weight: ${Typo.B3.fontWeight};
  color: ${Palette.Gray5};
`;

export const Button = styled.TouchableOpacity<{isValid: boolean}>`
  width: 100%;
  padding: 16px 30px;
  border-radius: 10px;
  background: ${props => (props.isValid ? Palette.Primary : Palette.Gray3)};
  margin-top: auto;
`;

export const ButtonText = styled(DefaultText)<{isValid: boolean}>`
  font-size: ${Typo.Button1.fontSize};
  font-weight: ${Typo.Button1.fontWeight};
  color: ${props => (props.isValid ? Palette.White : Palette.Gray4)};
  text-align: center;
`;

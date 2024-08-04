import DefaultText from 'components/DefaultText';
import {Palette} from 'constants/palette';
import {Typo} from 'constants/typo';
import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

const screenWidth = Dimensions.get('window').width;
const width = screenWidth - 32;

export const Container = styled.View`
  flex: 1;
  background: ${Palette.White};
`;

export const TopContainer = styled.View`
  padding: 0px 16px;
  background: ${Palette.White};
`;

export const ArrowDownWrapper = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  margin: 8px 16px 8px auto;
`;

export const TopLabel = styled.View`
  border-radius: 100px;
  background: ${Palette.P100};
  padding: 4px 14px;
  align-self: flex-start;
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

export const GrayContainer = styled.View`
  flex: 1;
  background: ${Palette.Gray1};
  padding: 18px 16px 30px;
  gap: 12px;
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

export const DetailTitle = styled(DefaultText)`
  font-size: ${Typo.SubTitle.fontSize};
  font-weight: ${Typo.SubTitle.fontWeight};
  color: ${Palette.Black};
`;

export const VisitRecordWrapper = styled.View`
  flex-direction: row;
  border-radius: 8px;
  background: ${Palette.Gray1};
  padding: 9px 0px;
  margin: 7px 0px;
`;

export const VisitRecordBox = styled.View`
  flex: 1;
  padding: 2px 0px;
`;

export const TextVisitNum = styled(DefaultText)<{isSuccessful?: boolean}>`
  font-size: ${Typo.SubTitle.fontSize};
  font-weight: ${Typo.SubTitle.fontWeight};
  color: ${props => (props.isSuccessful ? Palette.Primary : Palette.Secondary)};
  text-align: center;
  margin-bottom: 2px;
`;

export const VisitDescription = styled(DefaultText)`
  font-size: ${Typo.Label.fontSize};
  font-weight: ${Typo.Label.fontWeight};
  color: ${Palette.Gray5};
  text-align: center;
`;

export const TextDate = styled(DefaultText)`
  font-size: ${Typo.Label.fontSize};
  font-weight: ${Typo.Label.fontWeight};
  color: ${Palette.Gray4};
  margin-right: 8px;
`;

export const SeeAllWrapper = styled.TouchableOpacity`
  flex-direction: row;
  padding: 11px 0px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  border-top-width: 1px;
  border-top-color: ${Palette.Gray2};
`

export const TextSeeAll = styled(DefaultText)`
  font-size: ${Typo.B3.fontSize};
  font-weight: ${Typo.B3.fontWeight};
  color: ${Palette.Gray5};
`

export const BtnContainer = styled.View`
  flex-direction: row;
  padding: 10px 16px;
  background: ${Palette.White};
  margin-top: auto;
  justify-content: center;
  gap: 12px;
`;

export const Button = styled.TouchableOpacity<{isPrimary?: boolean}>`
  width: 164px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: ${props => (props.isPrimary ? Palette.Primary : Palette.Secondary)};
`;

export const ButtonText = styled(DefaultText)`
  font-size: ${Typo.Button1.fontSize};
  font-weight: ${Typo.Button1.fontWeight};
  color: ${Palette.White};
`;

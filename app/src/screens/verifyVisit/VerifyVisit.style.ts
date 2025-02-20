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
  padding: 10px 16px 0px;
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
  background: ${Palette.Gray1};
  margin: 14px 0px 16px;
  align-self: center;
`;

export const ImageArea = styled.ImageBackground`
  width: ${width}px;
  height: ${(width * 186) / 343}px;
`;

export const DetailWrapper = styled.View`
  border-radius: 10px;
  background: ${Palette.Gray1};
  padding: 14px 16px;
`;

export const TextLocation = styled(DefaultText)`
  font-size: ${Typo.B4.fontSize};
  font-weight: ${Typo.B4.fontWeight};
  color: ${Palette.Gray4};
  margin-right: 5px;
`;
export const LabelLocation = styled.View`
  border-radius: 100px;
  background: ${Palette.P200};
  padding: 2px 10px;
`;

export const LabelLocationText = styled(DefaultText)`
  font-size: ${Typo.Label.fontSize};
  font-weight: ${Typo.Label.fontWeight};
  color: ${Palette.P500};
`;

export const TextLocationContents = styled(DefaultText)`
  font-size: ${Typo.B1.fontSize};
  font-weight: ${Typo.B1.fontWeight};
  color: ${Palette.Black};
  margin-top: 2px;
`;

export const BtnContainer = styled.View`
  flex-direction: row;
  padding: 10px 16px;
  background: ${Palette.White};
  margin-top: auto;
  justify-content: center;
  gap: 12px;
`;

export const Button = styled.TouchableOpacity<{isPrimary?: boolean; isValid: boolean}>`
  width: 164px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: ${props => (props.isValid ? (props.isPrimary ? Palette.Primary : Palette.Secondary) : Palette.Gray3)};
`;

export const ButtonText = styled(DefaultText)<{isValid: boolean}>`
  font-size: ${Typo.Button1.fontSize};
  font-weight: ${Typo.Button1.fontWeight};
  color: ${props => (props.isValid ? Palette.White : Palette.Gray5)};
`;

export const WebViewContainer = styled.View`
  width: ${width}px;
  height: ${Math.round((width * 238) / 348)}px;
  border-radius: 10px;
`;

export const TextWebViewLoading = styled(DefaultText)`
  font-size: ${Typo.B1.fontSize};
  font-weight: ${Typo.B1.fontWeight};
  color: ${Palette.Black};
`;

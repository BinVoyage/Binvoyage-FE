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
  margin-bottom: 16px;
`;

export const LocationWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 3px;
  padding: 10px 12px;
  background: ${Palette.Gray1};
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

export const Title = styled(DefaultText)`
  font-size: ${Typo.Title1.fontSize};
  font-weight: ${Typo.Title1.fontWeight};
  color: ${Palette.Black};
  margin-top: 22px;
  margin-bottom: 26px;
`;

export const SubTitle = styled(DefaultText)`
  font-size: ${Typo.SubTitle.fontSize};
  font-weight: ${Typo.SubTitle.fontWeight};
  color: ${Palette.Black};
  margin-bottom: 12px;
`;

export const SelectWrapper = styled.View`
  flex-direction: row;
  row-gap: 12px;
  column-gap: 16px;
  flex-wrap: wrap;
`;

export const SelectItem = styled.TouchableOpacity<{isSelected: boolean}>`
  padding: 10px 22px;
  border-radius: 22px;
  flex-shrink: 0;
  background: ${props => (props.isSelected ? Palette.Primary : Palette.Gray2)};
`;

export const TextSelectItem = styled(DefaultText)<{isSelected: boolean}>`
  font-size: ${Typo.B3.fontSize};
  font-weight: ${Typo.B3.fontWeight};
  color: ${props => (props.isSelected ? Palette.White : Palette.Gray4)};
  text-align: center;
`;

export const ReviewInput = styled.TextInput`
  width: 100%;
  height: 150px;
  border-radius: 8px;
  padding: 12px 14px;
  background: ${Palette.Gray1};
  font-size: ${Typo.B3.fontSize};
  font-weight: ${Typo.B3.fontWeight};
  line-height: 19px;
  color: ${Palette.Black};
  margin: 18px 0px 15px;
`;

export const AddPicture = styled.TouchableOpacity`
  width: 100%;
  height: 134px;
  justify-content: center;
  background: ${Palette.P100};
  border-radius: 8px;
  padding: 22px 15px;
`;

export const IconAddPicture = styled.ImageBackground`
  width: 35px;
  height: 35px;
  align-self: center;
  margin-bottom: 10px;
`;

export const TextB3 = styled(DefaultText)`
  font-size: ${Typo.B3.fontSize};
  font-weight: ${Typo.B3.fontWeight};
  color: ${Palette.Gray6};
  text-align: center;
`;

export const Button = styled.TouchableOpacity<{isValid: boolean}>`
  width: 100%;
  padding: 16px 30px;
  justify-content: center;
  align-items: center;
  background: ${props => (props.isValid ? Palette.Primary : Palette.Gray3)};
  border-radius: 10px;
  margin-bottom: 20px;
`;

export const ButtonText = styled(DefaultText)<{isValid: boolean}>`
  font-size: ${Typo.Button1.fontSize};
  font-weight: ${Typo.Button1.fontWeight};
  color: ${props => (props.isValid ? Palette.White : Palette.Gray5)};
`;

export const ImageContainer = styled.View`
  position: relative;
  width: 100%;
`;

export const AttachedImage = styled.Image`
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 8px;
`;

export const BtnRemoveImage = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
`;

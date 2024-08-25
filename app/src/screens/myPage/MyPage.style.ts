import DefaultText from 'components/DefaultText';
import {Palette} from 'constants/palette';
import {Typo} from 'constants/typo';
import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

const screenWidth = Dimensions.get('window').width;
const width = screenWidth - 32;

const innerWidth = Math.round((width * 280) / 351) - 4;
const innerHeight = Math.round((innerWidth * 53) / 274);

export const MyWrapper = styled.View`
  width: 100%;
  flex: 1;
  background: ${Palette.Gray1};
  padding: 20px 16px;
`;

export const MyImage = styled.ImageBackground`
  width: ${width}px;
  height: ${Math.round((width * 157) / 351)}px;
  padding: 16px 0px;
  justify-content: space-between;
`;

export const TextWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;

export const FeedbackButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid ${Palette.P100};
  background: ${Palette.P100};
  margin: 20px 0px 12px;
`;

export const TextFeedbackButton = styled(DefaultText)`
  font-size: ${Typo.B1.fontSize};
  font-weight: ${Typo.B1.fontWeight};
  color: ${Palette.Primary};
`;

export const RowWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SettingTopWrapper = styled.View`
  position: relative;
  left: 4px;
  width: ${innerWidth};
  height: ${innerHeight};
  background: ${Palette.P400};
  padding: 8px 12px;
`;

export const NickName = styled.Text`
  font-size: ${Typo.SubTitle.fontSize};
  font-weight: ${Typo.SubTitle.fontWeight};
  color: ${Palette.Gray1};
  margin-right: 4px;
`;

export const Address = styled.Text`
  font-size: ${Typo.B3.fontSize};
  font-weight: ${Typo.B3.fontWeight};
  color: ${Palette.Gray1};
  margin: 4px 13px;
`;

export const UserGrid = styled.View`
  width: 100%;
  flex-direction: row;
  gap: 16px;
`;

export const UserColumn = styled.View`
  flex-direction: column;
  border-right-width: 1px;
  border-right-color: ${Palette.P200};
  padding-right: 16px;
`;

export const Sub = styled.Text`
  font-size: ${Typo.Label.fontSize};
  font-weight: ${Typo.Label.fontWeight};
  color: ${Palette.Gray1};
`;

export const ColumnContent = styled.Text`
  font-size: ${Typo.B3.fontSize};
  font-weight: ${Typo.B3.fontWeight};
  color: ${Palette.Gray1};
`;

export const Sero = styled.View`
  width: 1px;
  height: 34px;
  background: #ade0ff;
  margin-top: 10px;
`;

export const SettingWrapper = styled.View`
  border-radius: 12px;
  background: ${Palette.White};
  padding: 13px 0px 32px;
`;

export const SettingButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border: 1px solid ${Palette.White};
  background: ${Palette.White};
`;

export const DeleteText = styled.Text`
  font-size: ${Typo.B1.fontSize};
  font-weight: ${Typo.B1.fontWeight};
  color: ${Palette.Gray4};
`;

export const OtherText = styled.Text`
  font-size: ${Typo.B1.fontSize};
  font-weight: ${Typo.B1.fontWeight};
  color: ${Palette.Gray6};
  line-height: 22.4px; /* 22.4px */
`;

export const TextB1 = styled(DeleteText)`
  font-size: ${Typo.B1.fontSize};
  font-weight: ${Typo.B1.fontWeight};
  color: ${Palette.Gray6};
`;

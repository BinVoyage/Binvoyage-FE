import DefaultText from 'components/DefaultText';
import {Palette} from 'constants/palette';
import {Typo} from 'constants/typo';
import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

const screenWidth = Dimensions.get('window').width;
const width = screenWidth - 32;

export const MyWrapper = styled.View`
  width: 100%;
  height: 1200px;
  background: ${Palette.Gray1};
  padding: 16px 20px;
`;

export const MyImage = styled.ImageBackground`
  width: ${width};
  height: ${(width * 147) / 342}px;
  padding: 16px 0px;
`;

export const TextWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;

export const Texts = styled.View`
  padding-right: 175px;
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
  width: ${(width * 274) / 342};
  padding: 0px 13px 8px;
  margin-top: auto;
`;
export const WriteImage = styled.Image`
  align-content: left;
  padding-right: 8px;
`;

export const NickName = styled.Text`
  font-size: ${Typo.B3.fontSize};
  font-weight: ${Typo.B3.fontWeight};
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
  flex-direction: row;
  width: 275px;
`;

export const Usercolumn = styled.View`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  margin-left: 8px;
  margin-right: 8px;
  width: 71px;
  height: 35px;
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

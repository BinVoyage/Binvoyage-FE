import {Palette} from 'constants/palette';
import styled from 'styled-components/native';
import {Typo} from 'constants/typo';

export const Background = styled.View`
  position: absolute;
  flex: 1;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
  bottom: 0;
`;

export const Wrapper = styled.View`
  width: 100%;
  height: 428px;
  padding: 34px 18px 38px;
  border-radius: 20px 20px 0px 0px;
  background: ${Palette.White};
  gap: 6px;
  margin-top: auto;
`;

export const Header = styled.View`
  align-items: left;
  background: ${Palette.White};
`;

export const HeadText = styled.Text`
  font-weight: ${Typo.Title2.fontWeight};
  font-size: ${Typo.Title2.fontSize};
  color: ${Palette.Black};
`;

export const FirstText = styled.Text`
  margin-bottom: 20px;
  font-weight: ${Typo.B3.fontWeight};
  font-size: ${Typo.B3.fontSize};
  color: ${Palette.Black};
`;

export const SecondText = styled.Text`
  margin-bottom: 30px;
  font-weight: ${Typo.B3.fontWeight};
  font-size: ${Typo.B3.fontSize};
  color: ${Palette.Black};
`;
export const Body = styled.View`
  flex: 1;
  background: ${Palette.White};
`;

export const ButtonWrapper = styled.View`
  flex: 1;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
`;

export const ActiveButton = styled.TouchableOpacity`
  width: 100%;
  padding: 13px 30px;
  border-radius: 10px;
  background: ${Palette.Primary};
  margin-top: 10px;
  margin-bottom: 12px;
`;
export const DeleteButton = styled.TouchableOpacity`
  width: 100%;
  padding: 14px 30px;
  border-radius: 10px;
  background: ${Palette.Gray3};
  margin-top: 5px;
  margin-bottom: 18px;
`;

export const ButtonText = styled.Text`
  font-size: ${Typo.Button1.fontSize};
  font-weight: ${Typo.Button1.fontWeight};
  color: ${Palette.White};
  text-align: center;
`;

export const DeleteButtonText = styled.Text`
  font-size: ${Typo.Button1.fontSize};
  font-weight: ${Typo.Button1.fontWeight};
  color: ${Palette.Gray5};
  text-align: center;
`;

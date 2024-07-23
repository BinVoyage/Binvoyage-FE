import {Palette} from 'constants/palette';
import {Typo} from 'constants/typo';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 0px 24px;
  background: ${Palette.P100};
  justify-content: center;
`;

export const Wrapper = styled.View`
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: ${Typo.Title1.fontSize};
  font-weight: ${Typo.Title1.fontWeight};
  color: ${Palette.Black};
`;

export const SignInButtonWrapper = styled.View`
  width: 100%;
  gap: 14px;
  margin: 230px 0px 16px;
`;

export const GoogleSignInButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4px;
  width: 100%;
  padding: 12px 30px;
  background: ${Palette.White};
  border-radius: 10px;
`;

export const GoogleSignInText = styled.Text`
  font-size: ${Typo.Button1.fontSize};
  font-weight: ${Typo.Button1.fontWeight};
  color: ${Palette.Black};
  text-align: center;
`;

export const AppleSignInButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4px;
  width: 100%;
  padding: 12px 30px;
  background: ${Palette.Black};
  border-radius: 10px;
`;

export const AppleSignInText = styled.Text`
  font-size: ${Typo.Button1.fontSize};
  font-weight: ${Typo.Button1.fontWeight};
  color: ${Palette.White};
  text-align: center;
`;

export const PassSignInButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4px;
  width: 100%;
  padding: 12px 30px;
  background: ${Palette.Primary};
  border-radius: 10px;
`;

export const PassSignInText = styled.Text`
  font-size: ${Typo.Button1.fontSize};
  font-weight: ${Typo.Button1.fontWeight};
  color: ${Palette.White};
  text-align: center;
`;

export const TextFooterWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const TextFooter = styled.Text`
  font-size: ${Typo.Label.fontSize};
  font-weight: ${Typo.Label.fontWeight};
  color: ${Palette.Gray6};
`;

export const TextFooterLink = styled.Text`
  font-size: ${Typo.Label.fontSize};
  font-weight: ${Typo.Label.fontWeight};
  color: ${Palette.Primary};
  text-decoration: underline;
  text-decoration-color: ${Palette.Primary};
`;

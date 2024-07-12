import { GoogleSignin, GoogleSigninButton, GoogleSigninButtonProps } from "@react-native-google-signin/google-signin";
import appleAuth, {AppleButton, AppleButtonType} from "@invertase/react-native-apple-authentication";
import * as S from 'screens/login/Login.style'

export default function Login() {
  return <S.Container>
    <S.Title>{"No more wandering.\nStart your BinVoyage!"}</S.Title>
    <AppleButton buttonStyle={AppleButton.Style.BLACK} buttonType={AppleButton.Type.CONTINUE} onPress={() => {}}/>
    <GoogleSigninButton />
  </S.Container>;
}
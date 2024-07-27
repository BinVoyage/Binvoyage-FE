import {Text, TextProps} from 'react-native';

interface DefaultTextProps extends TextProps {}

export default function DefaultText({style, ...rest}: DefaultTextProps) {
  const defaultStyle = {
    fontFamily: 'Pretendard-Medium',
  };

  return <Text style={[defaultStyle, style]} {...rest} />;
}

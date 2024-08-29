import React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
export default function CheckBoxFilledSvg({width, height, fill}: SvgProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Rect x="2" y="2" width="20" height="20" rx="5" fill={fill} />
      <Path d="M7 11.3077L10.8095 15L17 9" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

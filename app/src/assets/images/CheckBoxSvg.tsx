import React from 'react';
import Svg, {Rect} from 'react-native-svg';
export default function CheckBoxSvg({width, height, fill}: SvgProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Rect x="2.5" y="2.5" width="19" height="19" rx="4.5" fill="#EFF1F4" stroke="#E4E6EA" />
    </Svg>
  );
}

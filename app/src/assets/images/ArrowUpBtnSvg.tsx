import React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';
export default function ArrowUpBtnSvg({width, height, fill}: SvgProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 32 32" fill="none">
      <Circle cx="16" cy="16" r="16" fill="#E4E6EA" />
      <Path d="M9 18.5L16 11.5L23 18.5" stroke="#5A5E6A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

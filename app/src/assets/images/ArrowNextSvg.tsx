import React from 'react';
import Svg, {Path} from 'react-native-svg';
export default function ArrowNextSvg({width, height, fill}: SvgProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 9 16" fill="none">
      <Path d="M0.999999 1L8 8L1 15" stroke={fill} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </Svg>
  );
}

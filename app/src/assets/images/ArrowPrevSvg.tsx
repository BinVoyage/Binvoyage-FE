import React from 'react';
import Svg, {Path} from 'react-native-svg';
export default function ArrowPrevSvg({width, height, fill}: SvgProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 9 16" fill="none">
      <Path d="M8 15L1 8L8 1" stroke={fill} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </Svg>
  );
}

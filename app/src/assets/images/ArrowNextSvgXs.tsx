
import React from 'react';
import Svg, {Path} from 'react-native-svg';
export default function ArrowNextSvgXs({width, height, fill}: SvgProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 7 12" fill="none">
      <Path d="M1.66667 1.91671L5.75 6.00004L1.66667 10.0834" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
import React from 'react';
import Svg, {Path} from 'react-native-svg';
export default function ArrowDownSvg({width, height, fill}: SvgProps) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path d="M19 8.5L12 15.5L5 8.5" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

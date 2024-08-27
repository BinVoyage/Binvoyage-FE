import React from 'react';
import Svg, {Path} from 'react-native-svg';
export default function ArrowDownSvgSm({width, height, fill}: SvgProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 19 18" fill="none">
      <Path d="M14.75 6.375L9.5 11.625L4.25 6.375" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

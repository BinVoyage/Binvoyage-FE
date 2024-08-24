import React from 'react';
import Svg, {Path} from 'react-native-svg';
export default function CancelSvg({width, height, fill}: SvgProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path d="M6 6L18 18M18 6L6 18" stroke="#5A5E6A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </Svg>
  );
}

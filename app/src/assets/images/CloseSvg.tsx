import React from 'react';
import Svg, {G, Path} from 'react-native-svg';
export default function CloseSvg({width, height, fill}: SvgProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <G id="close">
        <Path id="coolicon" d="M6 6L18 18M18 6L6 18" stroke="#9DA0A8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </G>
    </Svg>
  );
}

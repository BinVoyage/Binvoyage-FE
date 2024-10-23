import React from 'react';
import Svg, {G, Path, Circle, Defs, Rect} from 'react-native-svg';
export default function RemoveImageSvg({width, height, fill}: SvgProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill={fill}>
      <Circle cx="10" cy="10" r="10" fill="white" fillOpacity="0.5" />
      <Path d="M6 6L14 14" stroke="#5A5E6A" strokeWidth="2" strokeLinecap="round" />
      <Path d="M14 6L6 14" stroke="#5A5E6A" strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

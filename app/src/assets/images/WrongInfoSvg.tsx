import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
export default function WrongInfoSvg({width, height, fill}: SvgProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 18 18" fill="none">
      <Path
        d="M1.80078 8.9998C1.80078 12.9763 5.02433 16.1998 9.00078 16.1998C12.9772 16.1998 16.2008 12.9763 16.2008 8.9998C16.2008 5.02335 12.9772 1.7998 9.00078 1.7998C5.02433 1.7998 1.80078 5.02335 1.80078 8.9998Z"
        fill="#278FFF"
      />
      <Path
        d="M9.03867 6.2998V9.41212M9.07471 11.9998V12.0748L9 12.0745V11.9998H9.07471Z"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}

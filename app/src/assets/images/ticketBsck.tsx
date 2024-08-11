import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
export default function TicketBack({width, height, fill}: SvgProps) {
  return (
    <Svg width="69" height="147" viewBox="0 0 69 147" fill="none">
      <Path
        id="Vector"
        d="M3.38847 9C6.9531 9 10.9164 5.60044 11.6277 1.54012C11.7849 0.63005 12.4713 0 13.2322 0H63.2164C66.4089 0 69.0059 3.14025 69.0059 7.02055V139.979C69.0059 143.86 66.4089 147 63.2164 147H13.3149C12.5292 147 11.8345 146.33 11.6939 145.4C11.0736 141.19 6.0416 138 2.39427 138L0.405861 9H3.38847Z"
        fill="white"
      />
    </Svg>
  );
}

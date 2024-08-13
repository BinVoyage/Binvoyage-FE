import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
export default function TicketMain({width, height, fill}: SvgProps) {
  return (
    <Svg width="275" height="147" viewBox="0 0 275 147" fill="none">
      <Path
        d="M264.94 145.4C264.757 146.34 263.869 147 262.841 147H7.49002C3.3461 147 -0.00546265 143.86 -0.00546265 139.98V7.02C-0.00546265 3.14 3.35681 0 7.49002 0H262.937C263.933 0 264.811 0.63 265.014 1.54C265.946 5.6 269.779 8.99 274.395 9V138.01C269.672 138.01 265.753 141.2 264.94 145.41V145.4Z"
        fill="#278FFF"
      />
    </Svg>
  );
}

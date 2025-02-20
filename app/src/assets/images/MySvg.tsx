import React from 'react';
import Svg, {Path} from 'react-native-svg';
export default function MySvg({width, height, fill}: SvgProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 25 24" fill="none">
      <Path
        d="M12.8359 12C15.2522 12 17.2109 9.98528 17.2109 7.5C17.2109 5.01472 15.2522 3 12.8359 3C10.4197 3 8.46094 5.01472 8.46094 7.5C8.46094 9.98528 10.4197 12 12.8359 12Z"
        fill={fill}
      />
      <Path
        d="M12.8359 21C16.7019 21 19.8359 19.1868 19.8359 16.95C19.8359 14.7132 16.7019 12.9 12.8359 12.9C8.96994 12.9 5.83594 14.7132 5.83594 16.95C5.83594 19.1868 8.96994 21 12.8359 21Z"
        fill={fill}
      />
    </Svg>
  );
}

import React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';
export default function SearchSvg({width, height, fill}: SvgProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Circle cx="10" cy="10" r="7" stroke={fill} strokeWidth="2" />
      <Path
        d="M19.2929 21.7071C19.6834 22.0976 20.3166 22.0976 20.7071 21.7071C21.0976 21.3166 21.0976 20.6834 20.7071 20.2929L19.2929 21.7071ZM14.2929 16.7071L19.2929 21.7071L20.7071 20.2929L15.7071 15.2929L14.2929 16.7071Z"
        fill={fill}
      />
    </Svg>
  );
}

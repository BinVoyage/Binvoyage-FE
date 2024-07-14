import React from 'react';
import Svg, {Circle, Defs, G, Path} from 'react-native-svg';
export default function CurrentSvg() {
  return (
    <Svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <G id="Current location" filter="url(#filter0_d_673_6820)">
        <Circle
          id="Ellipse 987"
          cx="15"
          cy="14"
          r="11"
          fill="#278FFF"
          fill-opacity="0.4"
        />
        <Circle id="Ellipse 986" cx="15" cy="14" r="5" fill="#278FFF" />
      </G>
      <Defs>
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_673_6820"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_673_6820"
          result="shape"
        />
      </Defs>
    </Svg>
  );
}

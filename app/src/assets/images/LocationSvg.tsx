import React from 'react';
import Svg, {Circle, Defs, G, Path} from 'react-native-svg';
export default function LocaitonSvg({width, height, fill}: SvgProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 44 44" fill={fill}>
      <G id="location">
        <G id="Ellipse 7202" filter="url(#filter0_d_547_13532)">
          <circle cx="22" cy="21" r="20" fill="white" />
        </G>
        <G id="icon">
          <Path
            id="Union"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M22 9C22.5523 9 23 9.44772 23 10V11.2503C27.6151 11.7167 31.2845 15.3853 31.7523 20H33.0007C33.553 20 34.0007 20.4477 34.0007 21C34.0007 21.5523 33.553 22 33.0007 22H31.7523C31.2847 26.6149 27.6152 30.2838 23 30.7502V31.9998C23 32.5521 22.5523 32.9998 22 32.9998C21.4477 32.9998 21 32.5521 21 31.9998V30.7496C16.3875 30.2807 12.7209 26.613 12.2535 22H11C10.4477 22 10 21.5523 10 21C10 20.4477 10.4477 20 11 20H12.2535C12.7211 15.3872 16.3877 11.7197 21 11.2509V10C21 9.44772 21.4477 9 22 9ZM22.0029 13.2002C26.291 13.2002 29.771 16.6607 29.8025 20.9416C29.8013 20.9609 29.8008 20.9804 29.8008 21C29.8008 21.0196 29.8013 21.0391 29.8025 21.0584C29.7712 25.3308 26.3053 28.7861 22.0291 28.8002C22.0195 28.7999 22.0097 28.7998 22 28.7998C21.9905 28.7998 21.981 28.7999 21.9715 28.8002C17.6783 28.7833 14.2031 25.2976 14.2031 21.0002C14.2031 16.6924 17.6952 13.2002 22.0029 13.2002ZM19.6992 21.0012C19.6992 19.7309 20.729 18.7012 21.9991 18.7012C23.2693 18.7012 24.299 19.7309 24.299 21.0012C24.299 22.2715 23.2693 23.3012 21.9991 23.3012C20.729 23.3012 19.6992 22.2715 19.6992 21.0012ZM21.9991 16.7012C19.6243 16.7012 17.6992 18.6264 17.6992 21.0012C17.6992 23.376 19.6243 25.3012 21.9991 25.3012C24.3739 25.3012 26.299 23.376 26.299 21.0012C26.299 18.6264 24.3739 16.7012 21.9991 16.7012Z"
            fill="#278FFF"
          />
        </G>
      </G>
      <Defs>
        {/* <ilter id="filter0_d_547_13532" x="0" y="0" width="44" height="44" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> */}
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.44 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_547_13532"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_547_13532"
          result="shape"
        />
        {/* </filter> */}
      </Defs>
    </Svg>
  );
}

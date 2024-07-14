// declare module '*.svg' {
//   import React from 'react';
//   import {SvgProps} from 'react-native-svg';
//   const content: React.FC<SvgProps>;
//   export default content;
// }

declare module '*.svg' {
	import React = require('react');
  export const ReactComponent: REact.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
	export default src;
}
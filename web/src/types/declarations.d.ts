declare global {
  interface Window {
    ReactNativeWebView: {
      postMessage: (message: string) => void;
    };
    kakao: any;
  }
}

declare module '*.svg' {
	import React = require('react');
  export const ReactComponent: REact.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
	export default src;
}

export {};

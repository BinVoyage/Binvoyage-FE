import {Dimensions} from 'react-native';

const useResponsiveFontSize = (baseFontSize: number | string) => {
  if (typeof baseFontSize === 'string') {
    baseFontSize = parseFloat(baseFontSize);
  }
  const {height} = Dimensions.get('window');
  const baseHeight = 812;

  const responsiveFontSize = (height / baseHeight) * baseFontSize;
  return responsiveFontSize;
};

export default useResponsiveFontSize;

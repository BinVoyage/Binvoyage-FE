import {Palette} from 'constants/palette';
import {Typo} from 'constants/typo';
import {StyleSheet} from 'react-native';
import {BaseToast, BaseToastProps} from 'react-native-toast-message';
import {Dimensions} from 'react-native';

const width = Dimensions.get('window').width;

export const CustomToastConfig = {
  success: (props: BaseToastProps) => <BaseToast {...props} style={styles.success} text1Style={styles.text1} />,
  error: (props: BaseToastProps) => <BaseToast {...props} style={styles.error} text1Style={styles.text1} />,
};

const styles = StyleSheet.create({
  success: {
    width: width - 32,
    backgroundColor: 'rgba(45, 61, 92, 0.9)',
    borderRadius: 10,
    borderLeftWidth: 0,
    shadowColor: '#0B0A1E',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 10,
  },

  error: {
    width: width - 32,
    backgroundColor: 'rgba(204, 45, 45, 0.9)',
    borderRadius: 10,
    borderLeftWidth: 0,
    shadowColor: '#B22222',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 10,
  },

  text1: {
    fontFamily: 'Pretendard',
    fontSize: 13,
    fontWeight: 500,
    color: Palette.White,
  },
});

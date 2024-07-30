import {SafeAreaView, StyleSheet} from 'react-native';
import StackNavigator from 'components/StackNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import {CustomToastConfig} from 'components/CustomToastConfig';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={styles.flex1}>
      <SafeAreaView style={styles.flex1}>
        <StackNavigator />
        <Toast config={CustomToastConfig} />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
});

export default App;

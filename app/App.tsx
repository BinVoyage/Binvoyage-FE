import {SafeAreaView, StyleSheet} from 'react-native';
import StackNavigator from 'components/StackNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={styles.flex1}>
      <SafeAreaView style={styles.flex1}>
        <StackNavigator />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex:1
  }
})

export default App;

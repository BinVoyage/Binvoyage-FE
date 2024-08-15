import {SafeAreaView, StyleSheet, View} from 'react-native';
import StackNavigator from 'components/StackNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import {CustomToastConfig} from 'components/CustomToastConfig';
import {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App(): React.JSX.Element {
  const [isInitializing, setIsInitializing] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem('authToken');
    setIsLoggedIn(!!token);
    setIsInitializing(false);
  };

  useEffect(() => {
    checkLoginStatus().finally(() => {
      SplashScreen.hide();
    });
  }, []);

  if (isInitializing) {
    // 빈 화면을 표시하여 스플래시 화면 유지
    return <View style={{flex: 1, backgroundColor: 'transparent'}} />;
  }

  return (
    <GestureHandlerRootView style={styles.flex1}>
      <SafeAreaView style={styles.flex1}>
        {!isInitializing && <StackNavigator isLoggedIn={isLoggedIn} />}
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

import {AppState, AppStateStatus, SafeAreaView, StyleSheet, View} from 'react-native';
import StackNavigator from 'components/StackNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import {CustomToastConfig} from 'components/CustomToastConfig';
import {useEffect, useRef, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import analytics from '@react-native-firebase/analytics';
import {userStore} from 'store/Store';

function App(): React.JSX.Element {
  const [isInitializing, setIsInitializing] = useState(true);
  const {isLoggedIn, setIsLoggedIn} = userStore();
  const appStateRef = useRef<AppStateStatus>(AppState.currentState);
  const sessionStartTimeRef = useRef<number>(Date.now());

  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem('authToken');
    setIsLoggedIn(!!token);
    setIsInitializing(false);
  };

  const logInitialSession = async () => {
    const token = await AsyncStorage.getItem('authToken');
    try {
      await analytics().logEvent('bv_session_start', {
        timestamp: new Date().toISOString(),
        is_logged_in: !!token,
      });
    } catch (error) {
      console.error('Analytics error:', error);
    }
  };

  const subscription = AppState.addEventListener('change', async nextAppState => {
    const token = await AsyncStorage.getItem('authToken');
    try {
      const currentState = appStateRef.current;
      appStateRef.current = nextAppState;

      if ((currentState === 'inactive' || currentState === 'background') && nextAppState === 'active') {
        // 앱이 foreground로 돌아올 때
        sessionStartTimeRef.current = Date.now();
        await analytics().logEvent('bv_foreground', {
          timestamp: new Date().toISOString(),
          is_logged_in: !!token,
        });
      }

      if (nextAppState === 'background') {
        // 앱이 background로 갈 때 사용 시간 계산
        const sessionDuration = Math.floor((Date.now() - sessionStartTimeRef.current) / 1000); // 초 단위

        await analytics().logEvent('bv_background', {
          timestamp: new Date().toISOString(),
          session_duration_seconds: sessionDuration,
          is_logged_in: !!token,
        });
      }
    } catch (error) {
      console.error('Analytics error:', error);
    }
  });

  useEffect(() => {
    const init = async () => {
      await checkLoginStatus(); // 로그인 상태 확인 후
      await logInitialSession(); // 세션 시작 로그

      setTimeout(() => {
        setIsInitializing(false); // 초기화 완료
        SplashScreen.hide(); // 스플래시 화면 숨기기
      }, 3000); // 3초 지연
    };

    init();

    return () => {
      subscription.remove();
    };
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

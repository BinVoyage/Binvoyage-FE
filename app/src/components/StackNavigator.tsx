import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomNavigator from 'components/BottomNavigator';
import UserInput from 'screens/UserInput';
import Login from 'screens/login/Login';
import Onboarding from 'screens/OnBoarding';
import BinDetailNavigator from './BinDetailNavigator';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function StackNavigator() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  // 로그인 상태 확인 함수
  const checkLoginStatus = async () => {
    // 예시로 AsyncStorage에서 토큰을 가져와서 로그인 여부를 판단
    const token = await AsyncStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  // 로딩 상태 표시 (예: 로그인 상태를 확인하는 동안)
  if (isLoggedIn === null) {
    return null; // 로딩 상태에 따라 스플래시 화면 등을 표시할 수 있음
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? "BottomNavigator" : "BottomNavigator"} screenOptions={{headerShown: false}}>
        <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="OnBoarding" component={Onboarding} />
        <Stack.Screen name="UserInput" component={UserInput} />
        <Stack.Screen name="BinDetailNavigator" component={BinDetailNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

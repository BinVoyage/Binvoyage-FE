import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomNavigator from 'components/BottomNavigator';
import UserInput from 'screens/UserInput';
import Login from 'screens/login/Login';
import Onboarding from 'screens/OnBoarding';
import BinDetailNavigator from './BinDetailNavigator';
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyComment from 'screens/MyComment';
import DeleteAccount from 'screens/DeleteAccount';

type StackNavigatorProps = {
  isLoggedIn: boolean;
};

export default function StackNavigator({isLoggedIn}: StackNavigatorProps) {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? 'BottomNavigator' : 'Login'} screenOptions={{headerShown: false}}>
        <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="OnBoarding" component={Onboarding} />
        <Stack.Screen name="UserInput" component={UserInput} />
        <Stack.Screen name="BinDetailNavigator" component={BinDetailNavigator} />
        <Stack.Screen name="MyComment" component={MyComment} />
        <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

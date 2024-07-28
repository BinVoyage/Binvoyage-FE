import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomNavigator from 'components/BottomNavigator';
import UserInput from 'screens/UserInput';
import Login from 'screens/login/Login';
import Onboarding from 'screens/OnBoarding';
import BinDetail from 'screens/binDetail/BinDetail';

export default function StackNavigator() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BinDetail" screenOptions={{headerShown: false}}>
        <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="OnBoarding" component={Onboarding} />
        <Stack.Screen name="UserInput" component={UserInput} />
        <Stack.Screen name="BinDetail" component={BinDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

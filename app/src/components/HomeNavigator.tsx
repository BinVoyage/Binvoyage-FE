import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from 'screens/home/Home';
import LoginInProcess from 'screens/login/LoginInProcess';
import PassPort from 'screens/passport/PassPort';

export default function HomeNavigator() {
  const Stack = createNativeStackNavigator<RootHomeParamList>();
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false, gestureEnabled: true}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="PassPort" component={PassPort} />
      <Stack.Screen name="LoginInProcess" component={LoginInProcess} />
    </Stack.Navigator>
  );
}

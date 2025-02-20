import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyPage from 'screens/myPage/MyPage';
import MyComment from 'screens/MyComment';
import LoginInProcess from 'screens/login/LoginInProcess';

export default function MyNavigator() {
  const Stack = createNativeStackNavigator<RootMyParamList>();
  return (
    <Stack.Navigator initialRouteName="MyPage" screenOptions={{headerShown: false, gestureEnabled: true}}>
      <Stack.Screen name="MyPage" component={MyPage} />
      <Stack.Screen name="MyComment" component={MyComment} />
      <Stack.Screen name="LoginInProcess" component={LoginInProcess} />
    </Stack.Navigator>
  );
}

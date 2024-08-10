import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyPage from 'screens/MyPage';
import MyComment from 'screens/MyComment';

export default function MyNavigator() {
  const Stack = createNativeStackNavigator<RootMyParamList>();
  return (
    <Stack.Navigator initialRouteName="MyPage" screenOptions={{headerShown: false, gestureEnabled: true}}>
      <Stack.Screen name="MyPage" component={MyPage} />
      <Stack.Screen name="MyComment" component={MyComment} />
    </Stack.Navigator>
  );
}

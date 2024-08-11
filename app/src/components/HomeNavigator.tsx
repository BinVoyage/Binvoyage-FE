import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from 'screens/home/Home';
import PassPort from 'screens/passport/PassPort';
import NewTrash from 'screens/NewTrash';
import NewTrashDetail from 'screens/NewTrashDetail';

export default function HomeNavigator() {
  const Stack = createNativeStackNavigator<RootHomeParamList>();
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false, gestureEnabled: true}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="PassPort" component={PassPort} />
      <Stack.Screen name="NewTrash" component={NewTrash} />
      <Stack.Screen name="NewTrashDetail" component={NewTrashDetail} />
    </Stack.Navigator>
  );
}

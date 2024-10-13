import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from 'screens/home/Home';
import PassPort from 'screens/passport/PassPort';
import ReportNewBin from 'screens/reportNewBin/ReportNewBin';

export default function HomeNavigator() {
  const Stack = createNativeStackNavigator<RootHomeParamList>();
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false, gestureEnabled: true}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="PassPort" component={PassPort} />
      <Stack.Screen name="ReportNewBin" component={ReportNewBin} />
    </Stack.Navigator>
  );
}

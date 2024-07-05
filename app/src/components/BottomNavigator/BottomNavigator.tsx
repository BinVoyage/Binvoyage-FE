import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from 'screens/Home';

export default function BottomNavigator() {
  const Tab = createBottomTabNavigator<RootTabParamList>();

  return (
    <>
      <Tab.Navigator screenOptions={{}}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </>
  );
}

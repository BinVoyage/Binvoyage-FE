import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Home from 'screens/Home';
import FindBin from 'screens/FindBin';
import Mypage from 'screens/Mypage';
import HomeIcons from 'assets/HomeIcons';
import My from 'assets/My';
import Bins from 'assets/Bins';
import styled from 'styled-components';

export default function BottomNavigator() {
  const Tab = createBottomTabNavigator<RootTabParamList>();

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            height: 80,
            paddingBottom: 8,
            rowGap: 20,
            columnGap: 12,
            borderTopWidth: 0,
          },
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            headerStyle: [styles.header],
            tabBarIcon: () => (
              <TouchableOpacity style={styles.button}>
                <HomeIcons />
                <Text>홈</Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen
          name="FindBin"
          component={FindBin}
          options={{
            headerShown: false,
            headerStyle: [styles.header],
            tabBarIcon: () => (
              <TouchableOpacity style={styles.button}>
                <Bins />
                <Text>쓰레기통 찾기</Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen
          name="Mypage"
          component={Mypage}
          options={{
            headerShown: false,
            headerStyle: [styles.header],
            tabBarIcon: () => (
              <TouchableOpacity style={styles.button}>
                <My />
                <Text>내정보</Text>
              </TouchableOpacity>
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#FFFFFF',
    elevation: 0,
    borderBottomWidth: 0,
    shadowOpacity: 0,
  },
  font: {
    fontSize: 12,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    height: 200,
  },
});

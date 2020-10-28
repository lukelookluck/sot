/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Start from './src/pages/Start';
import SignUp from './src/pages/SignUp';
import Home from './src/pages/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Start"
        options={{headerShown: false}}
        component={Start}
      />
      <Stack.Screen
        name="SignUp"
        options={{headerShown: true}}
        component={SignUp}
      />
      <Stack.Screen
        name="Main"
        options={{headerShown: false}}
        component={TabsScreen}
      />
    </Stack.Navigator>
  );
}

function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>아아아ㅏ아아아</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const TabsScreen = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        if (route.name === '홈') {
          return (
            <Icon
              name={focused ? 'home' : 'home-outline'}
              size={size}
              color={color}
            />
          );
        } else if (route.name === '게시판 목록') {
          return (
            <Icon
              name={focused ? 'newspaper' : 'newspaper-outline'}
              size={size}
              color={color}
            />
          );
        } else if (route.name === '게임') {
          return (
            <Icon
              name={focused ? 'game-controller' : 'game-controller-outline'}
              size={size}
              color={color}
            />
          );
        }
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}>
    <Tab.Screen name="홈" component={Home} />
    <Tab.Screen name="게시판 목록" component={SettingsScreen} />
    <Tab.Screen name="게임" component={HomeScreen} />
  </Tab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      
      <MyStack />

    </NavigationContainer>
  );
}

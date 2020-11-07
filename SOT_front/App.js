import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  TouchableHighlight,
  FlatList,
  View,
} from 'react-native';
import Start from './src/pages/Start';
import SignUp from './src/pages/SignUp';
import Home from './src/pages/Home';
import Game from './src/pages/Game';
import List from './src/pages/List';
import WritePost from './src/pages/WritePost';
import Board from './src/pages/Board';
import ArticleDisplay from './src/pages/ArticleDisplay';
import SchoolSearch from './src/pages/SchoolSearch';
import ReqNewBoard from './src/pages/ReqNewBoard';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {CommonContext} from './src/context/CommonContext';
import {useLocalStorageSetState} from './src/common/CommonHooks';

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
        name="회원가입"
        options={{
          headerShown: true,
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#FACA0F',
          },
        }}
        component={SignUp}
      />
      <Stack.Screen
        name="schoolsearch"
        options={{
          title: '학교명 검색',
          headerShown: true,
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#FACA0F',
          },
        }}
        component={SchoolSearch}
      />
      <Stack.Screen
        name="Main"
        options={{headerShown: false}}
        component={TabsScreen}
      />
      <Stack.Screen
        name="Board"
        options={({route}) => ({
          title: route.params.name,
          headerShown: true,
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#FACA0F',
          },
        })}
        component={Board}
      />
      <Stack.Screen
        name="WritePost"
        options={{
          title: '글 쓰기',
          headerShown: true,
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#FACA0F',
          },
        }}
        component={WritePost}
      />
      <Stack.Screen
        name="ArticleDisplay"
        options={({navigation}) => ({
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerShown: true,
          headerRight: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Button
                onPress={() => navigation.navigate('WritePost')}
                title="글쓰기로 감(임시)"
              />
              <Icon
                name="ellipsis-vertical"
                style={{fontSize: 22.5, marginHorizontal: 10}}
              />
            </View>
          ),
        })}
        component={ArticleDisplay}
      />
      <Stack.Screen
        name="ReqNewBoard"
        options={{
          title: '게시판 신청',
          headerShown: true,
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#FACA0F',
          },
        }}
        component={ReqNewBoard}
      />
    </Stack.Navigator>
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
        } else if (route.name === '게임') {
          return (
            <Icon
              name={focused ? 'game-controller' : 'game-controller-outline'}
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
        }
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}>
    <Tab.Screen name="홈" component={Home} />
    <Tab.Screen name="게임" component={Game} />
    <Tab.Screen name="게시판 목록" component={List} />
  </Tab.Navigator>
);

export default function App() {
  const [user, setUser] = useLocalStorageSetState(
    {
      token: '',
      user: {
        id: '',
        email: '',
        nickname: '',
        password: '',
        schoolId: '',
        schoolName: '',
      },
    },
    'user',
  );

  const HOST = '118.45.110.147:8090';
  const serverUrl = `http://${HOST}`;

  return (
    <CommonContext.Provider
      value={{
        serverUrl,
        user,
        setUser,
      }}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </CommonContext.Provider>
  );
}

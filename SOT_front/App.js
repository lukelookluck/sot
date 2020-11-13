import React, { Component, useContext, useState } from 'react';
import {
  View,
  TouchableOpacity,
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
import MyPage from './src/pages/MyPage';
import MyArticle from './src/pages/MyArticle';
import LikeArticle from './src/pages/LikeArticle';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { CommonContext } from './src/context/CommonContext';
import { useLocalStorageSetState } from './src/common/CommonHooks';
import Search from './src/pages/Search'

import axios from 'axios';

const Stack = createStackNavigator();

// stack navitation 정리
function MyStack() {

  const { serverUrl, user, setUser, fav, setFav } = useContext(CommonContext);

  // 게시판 북마크 등록
  const addBookmark = (b_id, u_id) => {
    axios
      .post(`${serverUrl}/board/${b_id}/fav/`, {
        userId: u_id,
      })
      .then(function (response) {
        console.log(response.data);
        setFav(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // 게시판 북마크 삭제
  const deleteBookmark = (b_id, u_id) => {
    axios
      .delete(`${serverUrl}/board/${b_id}/fav?userId=${u_id}`)
      .then(function (response) {
        console.log(response.data);
        setFav(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const whatBook = (isfav, b_id, u_id) => {
    if (isfav) {
      deleteBookmark(b_id, u_id);
    } else {
      addBookmark(b_id, u_id);
    }
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Start"
        options={{ headerShown: false }}
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
        options={{ headerShown: false }}
        component={TabsScreen}
      />
      <Stack.Screen
        name="Board"
        options={({ route }) => ({
          title: route.params.name,
          headerShown: true,
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#FACA0F',
          },
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity onPress={() => whatBook(fav, route.params.id, route.params.u_id)}>
                <Icon
                  name={fav ? "bookmark" : "bookmark-outline"}
                  style={{ fontSize: 23, color: 'white', marginRight: 15 }}
                />
              </TouchableOpacity>
            </View>
          ),
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
        options={({ navigation }) => ({
          title: '',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerShown: true,
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#FACA0F',
          },
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
      <Stack.Screen
        name="MyPage"
        options={{
          title: '마이 페이지',
          headerShown: true,
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#FACA0F',
          },
        }}
        component={MyPage}
      />
      <Stack.Screen
        name="MyArticle"
        options={{
          title: '내가 쓴 글',
          headerShown: true,
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#FACA0F',
          },
        }}
        component={MyArticle}
      />
      <Stack.Screen
        name="LikeArticle"
        options={{
          title: '좋아요 한 글',
          headerShown: true,
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#FACA0F',
          },
        }}
        component={LikeArticle}
      />
      <Stack.Screen
        name="Search"
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerShown: false,
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#FACA0F',
          },
        }}
        component={Search}
      />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const TabsScreen = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
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
  const [fav, setFav] = useLocalStorageSetState(false, "fav");

  return (
    <CommonContext.Provider
      value={{
        serverUrl,
        user,
        setUser,
        fav,
        setFav,
      }}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </CommonContext.Provider>
  );
}

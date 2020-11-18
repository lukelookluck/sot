import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import 'react-native-gesture-handler';
import { CommonContext } from "../../context/CommonContext";
import AsyncStorage from '@react-native-community/async-storage';

// 마이페이지
const MyPage = ({ navigation }) => {

  const { serverUrl, user, setUser } = useContext(CommonContext);

  const goLogout = () => {
    setUser({});

    AsyncStorage.clear();

    alert('로그아웃 되었습니다');

    navigation.navigate('Start');
  };

  useEffect(() => {

    navigation.addListener('focus', () => {

      AsyncStorage.getItem('testToken', (err, result) => {
        const UserInfo = JSON.parse(result);
        console.log('닉네임 : ' + UserInfo.nickname);
        console.log('토큰 : ' + UserInfo.token);
        console.log('유저 : ' + UserInfo.id);

      });

    })
  }, []);

  return (
    <ScrollView>
      <View style={{ paddingBottom: 10, }}>
        <View style={styles.nick}>
          <Text style={styles.nicktext}>{user.nickname}</Text>
          <Text style={{ fontSize: 20 }}> 님</Text>
        </View>
        <View style={styles.email}>
          <Text style={styles.emailtext}>{user.email} / </Text>
          <Text style={{ fontSize: 15, }}>{user.schoolName}</Text>
        </View>
      </View>

      <View style={{ height: 15, backgroundColor: 'lightgray' }}></View>

      <View style={styles.title}>
        <TouchableOpacity onPress={() => navigation.navigate('MyArticle')}>
          <Text style={styles.titleText}>내가 쓴 게시글</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.title2}>
        <TouchableOpacity onPress={() => navigation.navigate('LikeArticle')}>
          <Text style={styles.titleText}>좋아요 한 게시글</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 15, backgroundColor: 'lightgray' }}></View>

      <View style={styles.title}>
        <TouchableOpacity onPress={goLogout}>
          <Text style={styles.titleText}>로그아웃</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  nick: {
    height: 50,
    flexDirection: 'row',
    paddingTop: 20,
  },

  nicktext: {
    fontSize: 20,
    marginLeft: 15,
    fontWeight: 'bold',
  },

  email: {
    height: 30,
    flexDirection: 'row',
  },

  emailtext: {
    fontSize: 15,
    marginLeft: 15
  },

  title: {
    height: 50,
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
    justifyContent: 'center',
  },

  title2: {
    height: 50,
    justifyContent: 'center',
  },

  titleText: {
    fontSize: 20,
    marginLeft: 15,
  }

});

export default MyPage;

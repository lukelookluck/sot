import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CommonContext} from "../../context/CommonContext";

const MyPage = ({navigation}) => {

  const { serverUrl, user, setUser } = useContext(CommonContext);

  return (
    <ScrollView>
      <View style={{borderBottomColor: 'gray', borderBottomWidth: 0.5, paddingBottom: 10,}}>
        <View style={styles.nick}>
          <Text style={styles.nicktext}>{user.nickname}</Text>
          <Text style={{fontSize: 20}}> 님</Text>
        </View>
        <View style={styles.email}>
          <Text style={styles.emailtext}>{user.email} / </Text>
          <Text style={{fontSize: 15,}}>{user.schoolName}</Text>
        </View>
      </View>

      <View style={styles.title}>
        <TouchableOpacity onPress={() => navigation.navigate('MyArticle')}>
          <Text style={styles.titleText}>내가 쓴 게시글</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.title}>
        <TouchableOpacity onPress={() => navigation.navigate('LikeArticle')}>
          <Text style={styles.titleText}>좋아요 한 게시글</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  nick : {
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

  title : {
    height: 50,
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
    justifyContent: 'center',
  },

  titleText: {
    fontSize: 20,
    marginLeft: 15,
  }
  

});

export default MyPage;

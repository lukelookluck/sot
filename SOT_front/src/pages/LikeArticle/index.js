import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import 'react-native-gesture-handler';
import {CommonContext} from '../../context/CommonContext';
import SingleArticle from '../../components/PartBoard/SingleArticle';
import AsyncStorage from '@react-native-community/async-storage';

// 좋아요 한 게시글 목록
const LikeArticle = ({navigation, route}) => {
  const {serverUrl, user, setUser, fav, setFav} = useContext(CommonContext);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    refreshList();
    navigation.addListener('focus', () => {
      refreshList();
    });
  }, []);

  function refreshList() {
    axios
      .get(`${serverUrl}/likedarticles?id=${user.id}`, {
        headers: {
          Authorization: user.token,
        },
      })
      .then((response) => {
        console.log('here????');
        setPostList([]);
        console.log(response.data);
        setPostList(response.data);
      })
      .catch((error) => {
        if (err.response.status === 401) {
          AsyncStorage.clear();
          alert('잘못된 요청입니다.');
        }
      });
  }

  return (
    <View style={styles.box}>
      <ScrollView>
        {postList.length === 0 ? (
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <Text style={{fontSize: 25, marginTop: 70}}>
              좋아요 한 게시글이 없습니다
            </Text>
          </View>
        ) : (
          <></>
        )}
        {postList.map((item, index) => (
          <View
            key={index}
            style={{borderBottomWidth: 0.5, borderBottomColor: 'gray'}}>
            <SingleArticle
              idx={index}
              article={item}
              navigation={navigation}></SingleArticle>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
  },

  container: {},
});

export default LikeArticle;

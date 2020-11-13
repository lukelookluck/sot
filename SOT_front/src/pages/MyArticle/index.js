import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import 'react-native-gesture-handler';
import {CommonContext} from '../../context/CommonContext';
import SingleArticle from '../../components/PartBoard/SingleArticle';

// 내가 쓴 게시글 목록
const MyArticle = ({navigation}) => {
  const {serverUrl, user, setUser, fav, setFav} = useContext(CommonContext);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    refreshList();
    navigation.addListener('focus', () => {
      refreshList();
      refreshList();
    });
  }, []);

  function refreshList() {
    axios
      .get(`${serverUrl}/myarticles?id=${user.id}`, {
        // headers: {
        //   Authorization: `JWT ${user.token}`,
        // },
      })
      .then((response) => {
        setPostList([]);
        console.log(response.data);
        setPostList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <View style={styles.box}>
      <ScrollView>
        {postList.length === 0 ? (
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <Text style={{fontSize: 25, marginTop: 70}}>
              작성한 게시글이 없습니다
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

export default MyArticle;

import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import 'react-native-gesture-handler';
import {CommonContext} from '../../context/CommonContext';
import SingleArticle from '../../components/PartBoard/SingleArticle';
import AsyncStorage from '@react-native-community/async-storage';

// 게시글 목록
const Board = ({navigation, route}) => {
  const {serverUrl, user, setUser, fav, setFav} = useContext(CommonContext);
  const [postList, setPostList] = useState([]);
  const [myLoading, setMyLoading] = useState(true);

  useEffect(() => {
    navigation.addListener('focus', () => {
      refreshList();
      isFav();
    });
  }, []);

  function isFav() {
    axios
      .get(`${serverUrl}/board/${route.params.id}/isfaved?userId=${user.id}`, {
        headers: {
          Authorization: user.token,
        },
      })
      .then((response) => {
        setFav(response.data);
      })
      .catch((error) => {
        if (err.response.status === 401) {
          AsyncStorage.clear();
          alert('잘못된 요청입니다.');
        }
      });
  }

  const gotoWrite = () => {
    navigation.navigate('WritePost', {
      boardname: route.params.name,
      boardid: route.params.id,
    });
  };

  function refreshList() {
    axios
      .get(`${serverUrl}/board/${route.params.id}`, {
        headers: {
          Authorization: user.token,
        },
      })
      .then((response) => {
        setMyLoading(false);
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
        {/* {(msg === 'no' &&
          route.params.isRe &&
          route.params.isRe === 'yes' &&
          reLoad()) ||
          noLoad()} */}
        {(myLoading === true && (
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Image
              source={require('../../components/PartBoard/Box/spiner.gif')}
              style={{width: 100, height: 100}}
            />
          </View>
        )) ||
          (postList.length === 0 ? (
            <View
              style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
              <Text style={{fontSize: 25, marginTop: 70}}>
                게시글이 없습니다
              </Text>
            </View>
          ) : (
            postList.map((item, index) => (
              <View
                key={index}
                style={{borderBottomWidth: 0.5, borderBottomColor: 'gray'}}>
                <SingleArticle
                  idx={index}
                  article={item}
                  navigation={navigation}></SingleArticle>
              </View>
            ))
          ))}
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          bottom: 40,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity style={styles.writeBtn} onPress={gotoWrite}>
          <Text style={{color: 'white', fontSize: 16, paddingHorizontal: 15}}>
            글 작성
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
  },

  container: {},

  writeBtn: {
    paddingVertical: 7.5,
    // width: 70,
    // height: 30,
    backgroundColor: '#F14E23',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 55,
  },
});

export default Board;

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
import {CommonContext} from '../../context/CommonContext';
import SingleArticle from '../../components/PartBoard/SingleArticle'

// 게시글 목록
const Board = ({navigation, route}) => {
  const {serverUrl, user, setUser, fav, setFav} = useContext(CommonContext);
  const [postList, setPostList] = useState([]);
  const [msg, setMsg] = useState('no');

  useEffect(() => {
    refreshList();
    navigation.addListener('focus', () => {
      refreshList();
    })
  }, []);

  const gotoWrite = () => {
    navigation.navigate('WritePost', {
      boardname: route.params.name,
      boardid: route.params.id,
    });
  };

  function refreshList() {
    axios
      .get(`${serverUrl}/board/${route.params.id}`, {
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

  function noLoad() {
    console.log(route.params.isRe);
  }

  function reLoad() {
    refreshList();
    route.params.isRe = 'no';
    console.log(route.params.isRe);
  }

  return (
    <View style={styles.box}>
      <ScrollView>
        {msg === 'no' && route.params.isRe && route.params.isRe === 'yes' && (reLoad()) || (noLoad())}
        {
          postList.length === 0
            ? (<View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, }}>
              <Text style={{ fontSize: 25, marginTop: 70, }}>게시글이 없습니다</Text>
            </View>)
            : (<></>)
        }
        {
          postList.map((item, index) => (
            <View key={index} style={{ borderBottomWidth: 0.5, borderBottomColor: "gray" }}>
              <SingleArticle
                idx={index}
                article={item}
                navigation={navigation}
              ></SingleArticle>
            </View>
          ))
        }
      </ScrollView>

      <View style={{ position: 'absolute', bottom: 20, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity style={styles.writeBtn} onPress={gotoWrite}>
          <Text style={{ color: 'white', fontSize: 15 }}>글작성</Text>
        </TouchableOpacity>
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
  },

  container: {

  },

  writeBtn: {
    width: 70,
    height: 30,
    backgroundColor: '#F14E23',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
});

export default Board;

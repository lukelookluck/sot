import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import { CommonContext } from "../../context/CommonContext";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    fontSize: 20,
    marginLeft: 15,
  },
  text_box: {
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
    // borderTopWidth: 0.5,
    // borderTopColor: "gray",
    justifyContent: 'center',
    height: 50,
  }
});

const List = ({navigation, route}) => {

  const [boardList, setBoardList] = useState([]);
  let cnt = 0;
  const [count, setCount] = useState(0);
  const { serverUrl, user, setUser } = useContext(CommonContext);
  const [msg, setMsg] = useState('no');

  useEffect(() => {
    refreshList();
  }, []);

  function reLoad() {
    refreshList();
    route.params.isRe = 'no';
    console.log(route.params.isRe);
  }

  function noLoad() {
    console.log('아니야');
  }

  function refreshList() {
    axios.get(`${serverUrl}/boards`, {
      // headers: {
      //   Authorization: `JWT ${user.token}`,
      // },
      params: {
        id : user.schoolId
      },
    })
      .then((response) => {
        setBoardList([]);
        console.log(response.data);
        setBoardList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const goBoard = (b_name, b_id) => {
    console.log('유저의 아이디는');
    console.log(user.id);
    navigation.navigate('Board', {name: b_name, id: b_id, u_id: user.id});
  };

  const goReqNewBoard = () => {
    navigation.navigate('ReqNewBoard');
  };

  return (
    <View style={styles.container}>
      <View style={{backgroundColor: '#ff8000', paddingLeft: 15, borderBottomWidth: 1,
        borderBottomColor: '#df380f', height: 56, justifyContent: 'center'}}>
        <Text style={{fontSize: 12, color: 'white'}}>SOT</Text>
        <Text style={{color: 'white', fontWeight: '700', fontSize: 18}}>
          {user.schoolName}
        </Text>
      </View>
      {/* {msg === 'no' && route.params.isRe && route.params.isRe === 'yes' && (reLoad()) || (noLoad())} */}
      <FlatList
        data={boardList}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={
          <View style={styles.text_box}>
            <Text style={styles.item} onPress={() => goReqNewBoard()}>게시판 신청하기</Text>
          </View>
        }
        renderItem={({item}) => (
          <View style={styles.text_box}>
            <Text style={styles.item} onPress={() => goBoard(item.name, item.id)}>{item.name}</Text>
          </View>
        )}></FlatList>
    </View>
  );
};

export default List;

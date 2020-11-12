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
    justifyContent: 'center',
    height: 50,
  }
});

const List = ({navigation, route}) => {

  const [boardList, setBoardList] = useState([]);
  const { serverUrl, user, setUser, fav, setFav } = useContext(CommonContext);

  useEffect(() => {
    refreshList();
    navigation.addListener('focus', () => {
      refreshList();
    })
  }, []);

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

    axios
      .get(`${serverUrl}/board/${b_id}/isfaved?userId=${user.id}`, {
        // headers: {
        //   Authorization: `JWT ${user.token}`,
        // },
      })
      .then((response) => {
        console.log(response.data);
        setFav(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    navigation.navigate('Board', {name: b_name, id: b_id, u_id: user.id, isRe: 'no'});
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

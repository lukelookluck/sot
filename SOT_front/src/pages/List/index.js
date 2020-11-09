import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import { CommonContext } from "../../context/CommonContext";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

const List = ({navigation}) => {

  const [boardList, setBoardList] = useState([]);

  const { serverUrl, user, setUser } = useContext(CommonContext);

  useEffect(() => {
    refreshList();
  }, []);

  function refreshList() {
    axios.get(`${serverUrl}/boards`, {
      // headers: {
      //   Authorization: `JWT ${user.token}`,
      // },
      params: {
        id : user.schoolId // user의 schoolId 받아서 넣기
      },
    })
      .then((response) => {
        console.log('here????');
        console.log(response.data);
        setBoardList(response.data);
      })
      .catch((error) => {
        console.log('why???');
        console.log(error);
      });
  }

  const goBoard = (b_name, b_id) => {
    navigation.navigate('Board', {name: b_name, id: b_id});
  };

  const goReqNewBoard = () => {
    navigation.navigate('ReqNewBoard');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={boardList}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={
          <Text style={styles.item} onPress={() => goReqNewBoard()}>게시판 신청하기</Text>
        }
        renderItem={({item}) => (
          <Text style={styles.item} onPress={() => goBoard(item.name, item.id)}>{item.name}</Text>
        )}></FlatList>
    </View>
  );
};

export default List;

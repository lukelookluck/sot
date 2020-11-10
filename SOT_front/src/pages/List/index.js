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

  useEffect(() => {
    refreshList();
    console.log('여기에왔음');
  }, []);

  function reLoad(){
    
    refreshList();

    cnt = cnt + 1;
    setCount(cnt);
    console.log(route.params.isRe);
    console.log(cnt);
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
        console.log(response.data);
        setBoardList(response.data);
      })
      .catch((error) => {
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
      <View style={{backgroundColor: '#ff8000', paddingLeft: 15, borderBottomWidth: 1,
        borderBottomColor: '#df380f', height: 56, justifyContent: 'center'}}>
        <Text style={{fontSize: 12, color: 'white'}}>SOT</Text>
        <Text style={{color: 'white', fontWeight: '700', fontSize: 18}}>
          {user.schoolName}
        </Text>
      </View>
      {/* { (count === 0 && route.params.isRef)
        ? (reLoad())
        : (console.log('여기야'))} */}
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

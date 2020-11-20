import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import {CommonContext} from '../../context/CommonContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    fontSize: 20,
  },
  text_box: {
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
  },
});

// 게시판 목록
const List = ({navigation, route}) => {
  const [boardList, setBoardList] = useState([]);
  const {
    serverUrl,
    user,
    setUser,
    fav,
    setFav,
    myLoading2,
    setMyloading2,
  } = useContext(CommonContext);

  useEffect(() => {
    navigation.addListener('focus', () => {
      refreshList();
    });
  }, []);

  function refreshList() {
    axios
      .get(`${serverUrl}/boards?id=${user.schoolId}&userId=${user.id}`, {
        // headers: {
        //   Authorization: `JWT ${user.token}`,
        // },
        // params: {
        //   id : user.schoolId
        // },
      })
      .then((response) => {
        setBoardList([]);
        setBoardList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function addBookmark(b_id, myBool) {
    setMyloading2(false);
    if (myBool === true) {
      axios
        .delete(`${serverUrl}/board/${b_id}/fav?userId=${user.id}`)
        .then((res) => {
          refreshList();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post(`${serverUrl}/board/${b_id}/fav/`, {
          userId: user.id,
        })
        .then((res) => {
          refreshList();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function goBoard(b_name, b_id) {
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

    navigation.navigate('Board', {
      name: b_name,
      id: b_id,
      u_id: user.id,
      isRe: 'no',
    });
  }

  function goReqNewBoard() {
    navigation.navigate('ReqNewBoard');
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: '#ff8000',
          paddingLeft: 15,
          borderBottomWidth: 1,
          borderBottomColor: '#df380f',
          height: 56,
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 12, color: 'white'}}>SOT</Text>
        <Text style={{color: 'white', fontWeight: '700', fontSize: 18}}>
          {user.schoolName}
        </Text>
      </View>
      <FlatList
        data={boardList}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={
          <TouchableHighlight
            onPress={() => goReqNewBoard()}
            activeOpacity={0.6}
            underlayColor="#dfdfdf">
            <View style={styles.text_box}>
              <Text style={styles.item}>게시판 신청하기</Text>
            </View>
          </TouchableHighlight>
        }
        renderItem={({item}) => (
          <TouchableHighlight
            onPress={() => goBoard(item.name, item.id)}
            activeOpacity={0.6}
            underlayColor="#dfdfdf">
            <View style={styles.text_box}>
              <Text style={styles.item}>{item.name}</Text>
              {(item.isFaved === true && (
                <TouchableHighlight
                  onPress={() => {
                    addBookmark(item.id, true);
                  }}
                  activeOpacity={0.6}
                  style={{
                    padding: 10,
                    borderRadius: 25,
                  }}
                  underlayColor="#dfdfdf">
                  <Text
                    style={{
                      color: 'red',
                    }}>
                    즐찾ing..
                  </Text>
                </TouchableHighlight>
              )) || (
                <TouchableHighlight
                  onPress={() => {
                    addBookmark(item.id, false);
                  }}
                  activeOpacity={0.6}
                  style={{
                    padding: 10,
                    borderRadius: 25,
                  }}
                  underlayColor="#dfdfdf">
                  <Text
                    style={{
                      color: 'black',
                    }}>
                    즐찾하기
                  </Text>
                </TouchableHighlight>
              )}
            </View>
          </TouchableHighlight>
        )}></FlatList>
    </View>
  );
};

export default List;

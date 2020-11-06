import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CommonContext} from '../../context/CommonContext';

const Board = ({navigation, route}) => {
  const {serverUrl} = useContext(CommonContext);

  const [postList, setPostList] = useState([]);

  useEffect(() => {
    refreshList();
  }, []);

  function refreshList() {
    axios
      .get(`${serverUrl}/board/${route.params.id}`, {
        // headers: {
        //   Authorization: `JWT ${user.token}`,
        // },
        // params: {
        //   id : 1 // user의 schoolId 받아서 넣기
        // },
      })
      .then((response) => {
        console.log('here????');
        console.log(response.data);
        setPostList(response.data);
      })
      .catch((error) => {
        console.log('why???');
        console.log(error);
      });
  }

  return (
    <View style={styles.box}>
      <FlatList
        data={postList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View>
            <Text style={styles.item}>{item.title}</Text>
            <Text style={styles.item}>{item.content}</Text>
            <Text style={styles.item}>{item.nickname}</Text>
          </View>
        )}></FlatList>

      <TouchableOpacity
        style={styles.writeBtn}
        onPress={() =>
          navigation.navigate('WritePost', {boardid: route.params.id})
        }>
        <Text style={{color: 'white', fontSize: 15}}>글작성</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    // flex: 1,
    // backgroundColor: 'red',
  },

  container: {
    // flex: 1,
    // backgroundColor: 'gray',
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

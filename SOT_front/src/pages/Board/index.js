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
import { color } from 'react-native-reanimated';

const Board = ({navigation, route}) => {
  const {serverUrl} = useContext(CommonContext);
  let cnt = 0;
  const [count, setCount] = useState(0);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    refreshList();
  }, []);

  const gotoWrite = () => {
    navigation.navigate('WritePost', {
      boardname: route.params.name,
      boardid: route.params.id,
    });
  }

  function reLoad(){
    axios
      .get(`${serverUrl}/board/${route.params.id}`, {
        // headers: {
        //   Authorization: `JWT ${user.token}`,
        // },
      })
      .then((response) => {
        setPostList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    cnt = cnt + 1;
    setCount(cnt);
    console.log(route.params.isRe);
    console.log(cnt);
  }

  function refreshList() {
    axios
      .get(`${serverUrl}/board/${route.params.id}`, {
        // headers: {
        //   Authorization: `JWT ${user.token}`,
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
      { (count === 0 && route.params.isRe)
        ? (reLoad())
        : (console.log('여기야'))}
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
        onPress={gotoWrite}>
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

import React, {useState} from 'react';
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

const boardList = [
  {
    key: '1',
    name: '자유게시판',

    list: [
      {
        id: '14',
        title: 'help',
        detail: 'help help help help !!!!!! help help help!!!!!!',
      },
      {
        id: '15',
        title: 'kill',
        detail: 'kill kill help kill !!!!!! help kill help!!!!!!',
      },
    ],
  },
  {
    key: '2',
    name: '1학년 게시판',

    list: [
      {
        id: '16',
        title: '괴로워어어ㅓ',
        detail: '살려주세요 인공지능이 지배하려고 해요',
      },
      {
        id: '17',
        title: '집에 가고싶다',
        detail: '격렬하게 집에 가고싶다!',
      },
      {
        id: '18',
        title: 'hey soul sister',
        detail: 'help me!',
      },
    ],
  },
  {
    key: '3',
    name: '2학년 게시판',
  },
  {
    key: '4',
    name: '3학년 게시판',
  },
  {
    key: '5',
    name: '모의고사 게시판',
  },
];

const Board = ({navigation, route}) => {

  const postList = boardList[1].list;
  return (
    // <View style={styles.box}>
    <ScrollView style={styles.container}>
      <Text>{route.params.key}</Text>

      <FlatList
        data={postList}
        renderItem={({item}) => (
          <View>
            <Text
              style={styles.item}
              >
              {item.title}
            </Text>
            <Text
              style={styles.item}
              >
              {item.detail}
            </Text>
          </View>
        )}></FlatList>

      <TouchableOpacity
        style={styles.writeBtn}
        onPress={() => navigation.navigate('WritePost')}>
        <Text style={{color: 'white', fontSize: 15}}>글작성</Text>
      </TouchableOpacity>
    </ScrollView>
    // </View>
  );
};

const styles = StyleSheet.create({
  box: {
    // flex: 1,
    // backgroundColor: 'red',
  },

  container: {
    // position: 'absolute',
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
    // position: 'relative',

    // position: 'absolute',
    // left: '40%',
    // top: '40%',
    // overflow: 'visible'
  },
});

export default Board;

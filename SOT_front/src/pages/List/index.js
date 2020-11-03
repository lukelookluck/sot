import React from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';

const boardList = [
  {
    'id': 1,
    'name': '자유게시판'
  },
  {
    'id': 2,
    'name': '1학년 게시판'
  },
  {
    'id': 3,
    'name': '2학년 게시판'
  },
  {
    'id': 4,
    'name': '3학년 게시판'
  },
  {
    'id': 5,
    'name': '모의고사 게시판'
  }
];

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

  const goBoard = (b_name) => {
    navigation.navigate('Board', {name: b_name});
  }

  return (
    <View>
      <Text>게시판 목록 탭</Text>

      <FlatList
        data={boardList}
        renderItem={({item}) => (
          <Text style={styles.item} onPress={() => goBoard(item.name)}>{item.name}</Text>
        )}></FlatList>
    </View>
  );
};

export default List;

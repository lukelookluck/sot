import React from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';

const boardList = [
  {
    'key': '1',
    'name': '자유게시판'
  },
  {
    'key': '2',
    'name': '1학년 게시판'
  },
  {
    'key': '3',
    'name': '2학년 게시판'
  },
  {
    'key': '4',
    'name': '3학년 게시판'
  },
  {
    'key': '5',
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

  const goBoard = (b_name, b_key) => {
    navigation.navigate('Board', {name: b_name, key: b_key});
  }

  return (
    <View>
      <FlatList
        data={boardList}
        renderItem={({item}) => (
          <Text style={styles.item} onPress={() => goBoard(item.name, item.key)}>{item.name}</Text>
        )}></FlatList>
    </View>
  );
};

export default List;

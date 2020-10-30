import React from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';

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

const List = () => {
  return (
    <View>
      <Text>게시판 목록 탭</Text>

      <FlatList
        data={[
          {key: '자유 게시판'},
          {key: '1학년 게시판'},
          {key: '2학년 게시판'},
          {key: '3학년 게시판'},
        ]}
        renderItem={({item}) => (
          <Text style={styles.item}>{item.key}</Text>
        )}></FlatList>
        
    </View>
  );
};

export default List;
